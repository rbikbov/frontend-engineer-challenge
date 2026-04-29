export interface JwtPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  [key: string]: unknown;
}

export const getJwtPayload = (token: string): JwtPayload | undefined => {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return undefined;

    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    return JSON.parse(payloadJson);
  } catch (_error) {
    return undefined;
  }
};

export const getJwtExpiration = (token: string): Date | undefined => {
  const payload = getJwtPayload(token);
  if (payload?.exp) {
    return new Date(payload.exp * 1000);
  }
  return undefined;
};
