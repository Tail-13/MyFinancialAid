import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { baseProperties } from "./baseProperties";
import { users } from "./userModel";

export const accountTypes = pgTable('account_types', {
    id: serial('id').primaryKey(),
    name: varchar('name', {length : 20}).notNull().unique(),
    isRequired: boolean('is_required').notNull().default(false),
    ...baseProperties
})

export const accounts = pgTable('accounts', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    accountTypeId: integer('account_type_id').references(() => accountTypes.id),
    name: varchar('name', {length : 20}).notNull(),
    balance: integer('balance').notNull().default(0),
    ...baseProperties
})