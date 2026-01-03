CREATE TYPE "public"."user_status" AS ENUM('active', 'waitlist');--> statement-breakpoint
ALTER TABLE "meetings" ALTER COLUMN "provider" SET DEFAULT 'DOs 4 DOERs';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "status" "user_status" DEFAULT 'active' NOT NULL;