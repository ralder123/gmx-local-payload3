import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_carousel_slides" ADD COLUMN "url" varchar;
  ALTER TABLE "pages_blocks_home_market_section_spot_prices" ADD COLUMN "url" varchar;
  ALTER TABLE "pages_blocks_trending_picks_trending_picks" ADD COLUMN "url" varchar;
  ALTER TABLE "pages_blocks_deals_of_the_week_deals" ADD COLUMN "url" varchar;
  ALTER TABLE "_pages_v_blocks_hero_carousel_slides" ADD COLUMN "url" varchar;
  ALTER TABLE "_pages_v_blocks_home_market_section_spot_prices" ADD COLUMN "url" varchar;
  ALTER TABLE "_pages_v_blocks_trending_picks_trending_picks" ADD COLUMN "url" varchar;
  ALTER TABLE "_pages_v_blocks_deals_of_the_week_deals" ADD COLUMN "url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_carousel_slides" DROP COLUMN "url";
  ALTER TABLE "pages_blocks_home_market_section_spot_prices" DROP COLUMN "url";
  ALTER TABLE "pages_blocks_trending_picks_trending_picks" DROP COLUMN "url";
  ALTER TABLE "pages_blocks_deals_of_the_week_deals" DROP COLUMN "url";
  ALTER TABLE "_pages_v_blocks_hero_carousel_slides" DROP COLUMN "url";
  ALTER TABLE "_pages_v_blocks_home_market_section_spot_prices" DROP COLUMN "url";
  ALTER TABLE "_pages_v_blocks_trending_picks_trending_picks" DROP COLUMN "url";
  ALTER TABLE "_pages_v_blocks_deals_of_the_week_deals" DROP COLUMN "url";`)
}
