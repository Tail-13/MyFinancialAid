ALTER TABLE "account_types" RENAME COLUMN "active" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "accounts" RENAME COLUMN "active" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "categories" RENAME COLUMN "active" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "goals" RENAME COLUMN "active" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "transaction_details" RENAME COLUMN "active" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "transaction_headers" RENAME COLUMN "active" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "active" TO "is_deleted";--> statement-breakpoint
ALTER TABLE "account_types" ALTER COLUMN "is_deleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "is_deleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "is_deleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "is_deleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "transaction_details" ALTER COLUMN "is_deleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "transaction_headers" ALTER COLUMN "is_deleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "is_deleted" SET DEFAULT false;