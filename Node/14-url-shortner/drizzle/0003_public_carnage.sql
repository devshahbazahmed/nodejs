ALTER TABLE "urls" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "urls" DROP CONSTRAINT "urls_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "urls" ADD CONSTRAINT "urls_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;