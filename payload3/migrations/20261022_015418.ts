import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "announcement_banner_announcements" CASCADE;
  DROP TABLE "announcement_banner" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "announcement_banner_announcements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"link_text" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "announcement_banner" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"active_announcement_index" numeric DEFAULT 1,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "announcement_banner_announcements" ADD CONSTRAINT "announcement_banner_announcements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_banner"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "announcement_banner_announcements_order_idx" ON "announcement_banner_announcements" USING btree ("_order");
  CREATE INDEX "announcement_banner_announcements_parent_id_idx" ON "announcement_banner_announcements" USING btree ("_parent_id");`)
}
