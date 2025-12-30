ALTER TABLE "items" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;