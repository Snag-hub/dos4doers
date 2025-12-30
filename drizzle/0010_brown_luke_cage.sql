CREATE TABLE "rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"reset" timestamp NOT NULL
);
--> statement-breakpoint
CREATE INDEX "items_user_status_created_idx" ON "items" USING btree ("userId","status","createdAt");--> statement-breakpoint
CREATE INDEX "items_user_url_idx" ON "items" USING btree ("userId","url");--> statement-breakpoint
CREATE INDEX "items_user_view_count_idx" ON "items" USING btree ("userId","viewCount");--> statement-breakpoint
CREATE INDEX "reminders_user_scheduled_idx" ON "reminders" USING btree ("userId","scheduledAt");--> statement-breakpoint
CREATE INDEX "tags_user_name_idx" ON "tags" USING btree ("userId","name");--> statement-breakpoint
CREATE INDEX "tasks_user_status_due_date_idx" ON "tasks" USING btree ("userId","status","dueDate");