import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  user: {
    id: primaryKey(String),
    email: String,
    password: String, // В моке храним в открытом виде для простоты
  },
  resetToken: {
    id: primaryKey(String),
    email: String,
    token: String,
    expiresAt: Number,
  },
});

// Добавим дефолтного пользователя
db.user.create({
  id: '1',
  email: 'test@example.com',
  password: 'password123',
});
