import { serial, integer, pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', {length : 50}).notNull().unique(),
    email: varchar('email', {length : 50}).notNull().unique(),
    password: varchar('password', {length : 255}),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
    active: boolean('active').default(true)
})