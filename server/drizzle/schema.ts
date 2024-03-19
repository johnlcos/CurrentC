import {
  pgTable,
  foreignKey,
  pgEnum,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const keyStatus = pgEnum('key_status', [
  'default',
  'valid',
  'invalid',
  'expired',
]);
export const keyType = pgEnum('key_type', [
  'aead-ietf',
  'aead-det',
  'hmacsha512',
  'hmacsha256',
  'auth',
  'shorthash',
  'generichash',
  'kdf',
  'secretbox',
  'secretstream',
  'stream_xchacha20',
]);
export const factorType = pgEnum('factor_type', ['totp', 'webauthn']);
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified']);
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const codeChallengeMethod = pgEnum('code_challenge_method', [
  's256',
  'plain',
]);

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().notNull(),
  username: text('username'),
});

export const feeds = pgTable('feeds', {
  id: uuid('id').defaultRandom(),
  author: text('username')
    .primaryKey()
    .notNull()
    .references(() => profiles.username, { onDelete: 'cascade' }),
  likes: integer('likes').default(0),
  dislikes: integer('dislikes').default(0),
  views: integer('views').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
