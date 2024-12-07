ALTER TABLE "account_types" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "goals" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "transaction_details" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "transaction_headers" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "account_types" DROP COLUMN IF EXISTS "is_deleted";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "is_deleted";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "is_deleted";--> statement-breakpoint
ALTER TABLE "goals" DROP COLUMN IF EXISTS "is_deleted";--> statement-breakpoint
ALTER TABLE "transaction_details" DROP COLUMN IF EXISTS "is_deleted";--> statement-breakpoint
ALTER TABLE "transaction_headers" DROP COLUMN IF EXISTS "is_deleted";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "is_deleted";