import { serial, integer, pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', {length : 50}).notNull().unique(),
    email: varchar('email', {length : 50}).notNull().unique(),
    password: varchar('password', {length : 255}),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
    updatedBy: integer('updated_by'),
    deletedAt: timestamp('deleted_at'),
    deletedBy: integer('deleted_by'),
    isDeleted: boolean('is_deleted').default(false)
})