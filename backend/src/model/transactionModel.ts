import { date, integer, pgEnum, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./userModel";
import { baseProperties } from "./baseProperties";
import { accounts } from "./accountModel";

export const entry = pgEnum('entry', ['debit', 'credit'])

export const transactionHeaders = pgTable('transaction_headers', {
    id: serial('id').notNull().primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    date: date('date').notNull(),
    description: text('description').notNull().default('-'),
    ...baseProperties
})

export const transactionDetails = pgTable('transaction_details', {
    id: serial('id').primaryKey(),
    transactionHeaderId: integer('header_id').notNull().references(() => transactionHeaders.id),
    accountId: integer('account_id').notNull().references(() => accounts.id),
    entry: entry(),
    amount: integer('amount').notNull().default(0),
    ...baseProperties
})