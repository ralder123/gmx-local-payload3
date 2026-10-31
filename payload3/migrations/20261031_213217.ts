import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_home_market_section_promo_cards_variant" AS ENUM('gold', 'silver', 'brand');
  CREATE TYPE "public"."enum__pages_v_blocks_home_market_section_promo_cards_variant" AS ENUM('gold', 'silver', 'brand');
  CREATE TABLE "pages_blocks_hero_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta" varchar DEFAULT 'Shop Now',
  	"category" varchar,
  	"brand" varchar,
  	"weight" varchar,
  	"form" varchar,
  	"country" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_market_section_spot_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"metal" varchar,
  	"bid" varchar,
  	"ask" varchar,
  	"change" varchar,
  	"is_positive" boolean DEFAULT true
  );
  
  CREATE TABLE "pages_blocks_home_market_section_promo_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"badge" varchar,
  	"button_text" varchar,
  	"button_url" varchar,
  	"image_id" integer,
  	"variant" "enum_pages_blocks_home_market_section_promo_cards_variant" DEFAULT 'gold'
  );
  
  CREATE TABLE "pages_blocks_home_market_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trending_picks_trending_picks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"category" varchar,
  	"brand" varchar,
  	"country" varchar,
  	"weight" varchar,
  	"form" varchar,
  	"price" varchar,
  	"purity" varchar,
  	"year" numeric,
  	"supplier_id" numeric
  );
  
  CREATE TABLE "pages_blocks_trending_picks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_deals_of_the_week_deals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"original_price" varchar,
  	"discount" varchar,
  	"quantity" varchar,
  	"category" varchar,
  	"brand" varchar,
  	"country" varchar,
  	"weight" varchar,
  	"form" varchar,
  	"supplier_id" numeric
  );
  
  CREATE TABLE "pages_blocks_deals_of_the_week" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_choose_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_why_choose_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta" varchar DEFAULT 'Shop Now',
  	"category" varchar,
  	"brand" varchar,
  	"weight" varchar,
  	"form" varchar,
  	"country" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_market_section_spot_prices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"metal" varchar,
  	"bid" varchar,
  	"ask" varchar,
  	"change" varchar,
  	"is_positive" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_market_section_promo_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"badge" varchar,
  	"button_text" varchar,
  	"button_url" varchar,
  	"image_id" integer,
  	"variant" "enum__pages_v_blocks_home_market_section_promo_cards_variant" DEFAULT 'gold',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_market_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trending_picks_trending_picks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"category" varchar,
  	"brand" varchar,
  	"country" varchar,
  	"weight" varchar,
  	"form" varchar,
  	"price" varchar,
  	"purity" varchar,
  	"year" numeric,
  	"supplier_id" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trending_picks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_deals_of_the_week_deals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"original_price" varchar,
  	"discount" varchar,
  	"quantity" varchar,
  	"category" varchar,
  	"brand" varchar,
  	"country" varchar,
  	"weight" varchar,
  	"form" varchar,
  	"supplier_id" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_deals_of_the_week" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_choose_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_choose_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero_carousel_slides" ADD CONSTRAINT "pages_blocks_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_carousel" ADD CONSTRAINT "pages_blocks_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_market_section_spot_prices" ADD CONSTRAINT "pages_blocks_home_market_section_spot_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_market_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_market_section_promo_cards" ADD CONSTRAINT "pages_blocks_home_market_section_promo_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_market_section_promo_cards" ADD CONSTRAINT "pages_blocks_home_market_section_promo_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_market_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_market_section" ADD CONSTRAINT "pages_blocks_home_market_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trending_picks_trending_picks" ADD CONSTRAINT "pages_blocks_trending_picks_trending_picks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trending_picks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trending_picks" ADD CONSTRAINT "pages_blocks_trending_picks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_deals_of_the_week_deals" ADD CONSTRAINT "pages_blocks_deals_of_the_week_deals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_deals_of_the_week"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_deals_of_the_week" ADD CONSTRAINT "pages_blocks_deals_of_the_week_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_section_features" ADD CONSTRAINT "pages_blocks_why_choose_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_choose_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_section" ADD CONSTRAINT "pages_blocks_why_choose_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_carousel" ADD CONSTRAINT "_pages_v_blocks_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_market_section_spot_prices" ADD CONSTRAINT "_pages_v_blocks_home_market_section_spot_prices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_market_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_market_section_promo_cards" ADD CONSTRAINT "_pages_v_blocks_home_market_section_promo_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_market_section_promo_cards" ADD CONSTRAINT "_pages_v_blocks_home_market_section_promo_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_market_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_market_section" ADD CONSTRAINT "_pages_v_blocks_home_market_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trending_picks_trending_picks" ADD CONSTRAINT "_pages_v_blocks_trending_picks_trending_picks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trending_picks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trending_picks" ADD CONSTRAINT "_pages_v_blocks_trending_picks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_deals_of_the_week_deals" ADD CONSTRAINT "_pages_v_blocks_deals_of_the_week_deals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_deals_of_the_week"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_deals_of_the_week" ADD CONSTRAINT "_pages_v_blocks_deals_of_the_week_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_choose_section_features" ADD CONSTRAINT "_pages_v_blocks_why_choose_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_choose_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_choose_section" ADD CONSTRAINT "_pages_v_blocks_why_choose_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_carousel_slides_order_idx" ON "pages_blocks_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_carousel_slides_parent_id_idx" ON "pages_blocks_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_carousel_order_idx" ON "pages_blocks_hero_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_carousel_parent_id_idx" ON "pages_blocks_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_carousel_path_idx" ON "pages_blocks_hero_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_market_section_spot_prices_order_idx" ON "pages_blocks_home_market_section_spot_prices" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_market_section_spot_prices_parent_id_idx" ON "pages_blocks_home_market_section_spot_prices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_market_section_promo_cards_order_idx" ON "pages_blocks_home_market_section_promo_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_market_section_promo_cards_parent_id_idx" ON "pages_blocks_home_market_section_promo_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_market_section_promo_cards_image_idx" ON "pages_blocks_home_market_section_promo_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_home_market_section_order_idx" ON "pages_blocks_home_market_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_market_section_parent_id_idx" ON "pages_blocks_home_market_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_market_section_path_idx" ON "pages_blocks_home_market_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_trending_picks_trending_picks_order_idx" ON "pages_blocks_trending_picks_trending_picks" USING btree ("_order");
  CREATE INDEX "pages_blocks_trending_picks_trending_picks_parent_id_idx" ON "pages_blocks_trending_picks_trending_picks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trending_picks_order_idx" ON "pages_blocks_trending_picks" USING btree ("_order");
  CREATE INDEX "pages_blocks_trending_picks_parent_id_idx" ON "pages_blocks_trending_picks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trending_picks_path_idx" ON "pages_blocks_trending_picks" USING btree ("_path");
  CREATE INDEX "pages_blocks_deals_of_the_week_deals_order_idx" ON "pages_blocks_deals_of_the_week_deals" USING btree ("_order");
  CREATE INDEX "pages_blocks_deals_of_the_week_deals_parent_id_idx" ON "pages_blocks_deals_of_the_week_deals" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_deals_of_the_week_order_idx" ON "pages_blocks_deals_of_the_week" USING btree ("_order");
  CREATE INDEX "pages_blocks_deals_of_the_week_parent_id_idx" ON "pages_blocks_deals_of_the_week" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_deals_of_the_week_path_idx" ON "pages_blocks_deals_of_the_week" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_choose_section_features_order_idx" ON "pages_blocks_why_choose_section_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_section_features_parent_id_idx" ON "pages_blocks_why_choose_section_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_section_order_idx" ON "pages_blocks_why_choose_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_section_parent_id_idx" ON "pages_blocks_why_choose_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_section_path_idx" ON "pages_blocks_why_choose_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_carousel_slides_order_idx" ON "_pages_v_blocks_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_carousel_slides_parent_id_idx" ON "_pages_v_blocks_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_carousel_order_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_carousel_parent_id_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_carousel_path_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_market_section_spot_prices_order_idx" ON "_pages_v_blocks_home_market_section_spot_prices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_market_section_spot_prices_parent_id_idx" ON "_pages_v_blocks_home_market_section_spot_prices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_market_section_promo_cards_order_idx" ON "_pages_v_blocks_home_market_section_promo_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_market_section_promo_cards_parent_id_idx" ON "_pages_v_blocks_home_market_section_promo_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_market_section_promo_cards_image_idx" ON "_pages_v_blocks_home_market_section_promo_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_home_market_section_order_idx" ON "_pages_v_blocks_home_market_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_market_section_parent_id_idx" ON "_pages_v_blocks_home_market_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_market_section_path_idx" ON "_pages_v_blocks_home_market_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trending_picks_trending_picks_order_idx" ON "_pages_v_blocks_trending_picks_trending_picks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trending_picks_trending_picks_parent_id_idx" ON "_pages_v_blocks_trending_picks_trending_picks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trending_picks_order_idx" ON "_pages_v_blocks_trending_picks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trending_picks_parent_id_idx" ON "_pages_v_blocks_trending_picks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trending_picks_path_idx" ON "_pages_v_blocks_trending_picks" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_deals_of_the_week_deals_order_idx" ON "_pages_v_blocks_deals_of_the_week_deals" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_deals_of_the_week_deals_parent_id_idx" ON "_pages_v_blocks_deals_of_the_week_deals" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_deals_of_the_week_order_idx" ON "_pages_v_blocks_deals_of_the_week" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_deals_of_the_week_parent_id_idx" ON "_pages_v_blocks_deals_of_the_week" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_deals_of_the_week_path_idx" ON "_pages_v_blocks_deals_of_the_week" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_why_choose_section_features_order_idx" ON "_pages_v_blocks_why_choose_section_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_choose_section_features_parent_id_idx" ON "_pages_v_blocks_why_choose_section_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_choose_section_order_idx" ON "_pages_v_blocks_why_choose_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_choose_section_parent_id_idx" ON "_pages_v_blocks_why_choose_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_choose_section_path_idx" ON "_pages_v_blocks_why_choose_section" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_carousel_slides" CASCADE;
  DROP TABLE "pages_blocks_hero_carousel" CASCADE;
  DROP TABLE "pages_blocks_home_market_section_spot_prices" CASCADE;
  DROP TABLE "pages_blocks_home_market_section_promo_cards" CASCADE;
  DROP TABLE "pages_blocks_home_market_section" CASCADE;
  DROP TABLE "pages_blocks_trending_picks_trending_picks" CASCADE;
  DROP TABLE "pages_blocks_trending_picks" CASCADE;
  DROP TABLE "pages_blocks_deals_of_the_week_deals" CASCADE;
  DROP TABLE "pages_blocks_deals_of_the_week" CASCADE;
  DROP TABLE "pages_blocks_why_choose_section_features" CASCADE;
  DROP TABLE "pages_blocks_why_choose_section" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_carousel_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_home_market_section_spot_prices" CASCADE;
  DROP TABLE "_pages_v_blocks_home_market_section_promo_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_home_market_section" CASCADE;
  DROP TABLE "_pages_v_blocks_trending_picks_trending_picks" CASCADE;
  DROP TABLE "_pages_v_blocks_trending_picks" CASCADE;
  DROP TABLE "_pages_v_blocks_deals_of_the_week_deals" CASCADE;
  DROP TABLE "_pages_v_blocks_deals_of_the_week" CASCADE;
  DROP TABLE "_pages_v_blocks_why_choose_section_features" CASCADE;
  DROP TABLE "_pages_v_blocks_why_choose_section" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_home_market_section_promo_cards_variant";
  DROP TYPE "public"."enum__pages_v_blocks_home_market_section_promo_cards_variant";`)
}
