import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_ticker_items" CASCADE;
  DROP TYPE "public"."enum_header_ticker_items_icon";
  DROP TYPE "public"."enum_header_ticker_items_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_ticker_items_icon" AS ENUM('none', 'ShoppingCart', 'Menu', 'X', 'User', 'UserPlus', 'LogIn', 'Headphones', 'PackageSearch', 'ChevronDown', 'TrendingUp', 'TrendingDown');
  CREATE TYPE "public"."enum_header_ticker_items_category" AS ENUM('gold', 'silver', 'platinum', 'palladium');
  CREATE TABLE "header_ticker_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"new_tab" boolean DEFAULT false,
  	"icon" "enum_header_ticker_items_icon" DEFAULT 'none',
  	"description" varchar,
  	"symbol" varchar NOT NULL,
  	"category" "enum_header_ticker_items_category" NOT NULL
  );
  
  ALTER TABLE "header_ticker_items" ADD CONSTRAINT "header_ticker_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_ticker_items_order_idx" ON "header_ticker_items" USING btree ("_order");
  CREATE INDEX "header_ticker_items_parent_id_idx" ON "header_ticker_items" USING btree ("_parent_id");`)
}
