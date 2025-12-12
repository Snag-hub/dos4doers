ALTER TABLE "user" ADD COLUMN "apiToken" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_apiToken_unique" UNIQUE("apiToken");