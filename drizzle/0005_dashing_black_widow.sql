ALTER TABLE "account" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "session" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "verificationToken" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "account" CASCADE;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "verificationToken" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "emailVerified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "pro";