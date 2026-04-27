import { SignJWT, jwtVerify } from 'jose';
import type {
  AuthApi,
  User,
  AuthPayload,
  TokenPair,
  ResetRequestPayload
} from '../contract';
import { db } from './db';

const JWT_SECRET = new TextEncoder().encode('mock-secret-key');

export class MockAuthService implements AuthApi {
  constructor(private endpoint?: string, private options?: { headers?: Record<string, string> }) {}

  private async generateTokens(user: { id: string; email: string }): Promise<TokenPair> {
    const accessToken = await new SignJWT({ sub: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(JWT_SECRET);

    const refreshToken = await new SignJWT({ sub: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    return { accessToken, refreshToken };
  }

  async register(email: string, password: string): Promise<User> {
    const existing = db.user.findFirst({ where: { email: { equals: email } } });
    if (existing) throw new Error('User already exists');

    const user = db.user.create({
      id: Math.random().toString(36).substring(7),
      email,
      password,
    });

    return { id: user.id, email: user.email };
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = db.user.findFirst({
      where: {
        email: { equals: email },
        password: { equals: password }
      }
    });

    if (!user) throw new Error('Invalid credentials');

    const tokens = await this.generateTokens(user);
    return {
      ...tokens,
    };
  }

  async logout(): Promise<boolean> {
    return true;
  }

  async refreshToken(token: string): Promise<TokenPair> {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const user = db.user.findFirst({ where: { id: { equals: payload.sub as string } } });
      if (!user) throw new Error('User not found');

      return this.generateTokens(user);
    } catch {
      throw new Error('Invalid refresh token');
    }
  }

  async requestPasswordReset(email: string): Promise<ResetRequestPayload> {
    const user = db.user.findFirst({ where: { email: { equals: email } } });
    if (!user) throw new Error('User not found');

    const token = Math.random().toString(36).substring(2, 15);
    db.resetToken.create({
      id: Math.random().toString(36).substring(7),
      email,
      token,
      expiresAt: Date.now() + 3600000, // 1 hour
    });

    return { success: true, token, email };
  }

  async resetPassword(email: string, token: string, newPassword: string): Promise<boolean> {
    const resetReq = db.resetToken.findFirst({
      where: {
        email: { equals: email },
        token: { equals: token }
      }
    });

    if (!resetReq || resetReq.expiresAt < Date.now()) {
      throw new Error('Invalid or expired reset token');
    }

    const user = db.user.findFirst({ where: { email: { equals: email } } });
    if (!user) throw new Error('User not found');

    db.user.update({
      where: { id: { equals: user.id } },
      data: { password: newPassword }
    });

    db.resetToken.delete({ where: { id: { equals: resetReq.id } } });

    return true;
  }

  async me(): Promise<User> {
    const authHeader = this.options?.headers?.['Authorization'] || this.options?.headers?.['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const user = db.user.findFirst({ where: { id: { equals: payload.sub as string } } });
      
      if (!user) throw new Error('User not found');
      
      return { id: user.id, email: user.email };
    } catch {
      throw new Error('Unauthorized');
    }
  }
}
