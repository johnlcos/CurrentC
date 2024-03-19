"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feeds = exports.profiles = exports.codeChallengeMethod = exports.aalLevel = exports.factorStatus = exports.factorType = exports.keyType = exports.keyStatus = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.keyStatus = (0, pg_core_1.pgEnum)('key_status', [
    'default',
    'valid',
    'invalid',
    'expired',
]);
exports.keyType = (0, pg_core_1.pgEnum)('key_type', [
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
exports.factorType = (0, pg_core_1.pgEnum)('factor_type', ['totp', 'webauthn']);
exports.factorStatus = (0, pg_core_1.pgEnum)('factor_status', ['unverified', 'verified']);
exports.aalLevel = (0, pg_core_1.pgEnum)('aal_level', ['aal1', 'aal2', 'aal3']);
exports.codeChallengeMethod = (0, pg_core_1.pgEnum)('code_challenge_method', [
    's256',
    'plain',
]);
exports.profiles = (0, pg_core_1.pgTable)('profiles', {
    id: (0, pg_core_1.uuid)('id').primaryKey().notNull(),
    username: (0, pg_core_1.text)('username'),
});
exports.feeds = (0, pg_core_1.pgTable)('feeds', {
    id: (0, pg_core_1.uuid)('id').defaultRandom(),
    author: (0, pg_core_1.text)('username')
        .primaryKey()
        .notNull()
        .references(() => exports.profiles.username, { onDelete: 'cascade' }),
    likes: (0, pg_core_1.integer)('likes').default(0),
    dislikes: (0, pg_core_1.integer)('dislikes').default(0),
    views: (0, pg_core_1.integer)('views').default(0),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
