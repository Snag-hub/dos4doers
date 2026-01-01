ALTER TABLE "meetings" ADD COLUMN "provider" text DEFAULT 'dayos' NOT NULL;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "externalId" text;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "calendarId" text;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "calendarName" text;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "calendarColor" text;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "accountEmail" text;