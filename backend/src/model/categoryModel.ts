import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users } from "./userModel";
import { baseProperties } from "./baseProperties";

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    name: varchar('name').notNull(),
    ...baseProperties
})

export const goals = pgTable('goals',{
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    categoryId: integer('category_id').notNull(),
    target: integer('target').notNull().default(0),
    startDate: date('start_date').notNull().defaultNow(),
    endDate: date('end_date').notNull(),
    ...baseProperties
})