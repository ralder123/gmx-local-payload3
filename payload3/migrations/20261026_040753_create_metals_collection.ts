import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "metals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"symbol" varchar NOT NULL,
  	"bid" numeric NOT NULL,
  	"ask" numeric NOT NULL,
  	"spread" numeric,
  	"show_in_ticker" boolean DEFAULT true,
  	"ticker_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "metals_id" integer;
  CREATE INDEX "metals_updated_at_idx" ON "metals" USING btree ("updated_at");
  CREATE INDEX "metals_created_at_idx" ON "metals" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_metals_fk" FOREIGN KEY ("metals_id") REFERENCES "public"."metals"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_metals_id_idx" ON "payload_locked_documents_rels" USING btree ("metals_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "metals" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "metals" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_metals_fk";
  
  DROP INDEX "payload_locked_documents_rels_metals_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "metals_id";`)
}
