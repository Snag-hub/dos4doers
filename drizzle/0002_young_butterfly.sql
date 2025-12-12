ALTER TABLE "user" DROP CONSTRAINT "user_apiToken_unique";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DEFAULT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "apiToken" SET DEFAULT NULL;