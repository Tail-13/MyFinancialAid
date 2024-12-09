import { boolean, integer, timestamp } from "drizzle-orm/pg-core"
import { users } from "./userModel"

export const baseProperties = {
    createdBy: integer('created_by').notNull().references(() => users.id),
    updatedBy: integer('updated_by').references(() => users.id),
    deletedBy: integer('deleted_by').references(() => users.id),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
    isDeleted: boolean('is_deleted').default(false)
}