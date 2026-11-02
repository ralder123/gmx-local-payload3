import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_carousel_slides" RENAME TO "pages_blocks_product_hero_carousel_slides";
  ALTER TABLE "pages_blocks_hero_carousel" RENAME TO "pages_blocks_product_hero_carousel";
  ALTER TABLE "_pages_v_blocks_hero_carousel_slides" RENAME TO "_pages_v_blocks_product_hero_carousel_slides";
  ALTER TABLE "_pages_v_blocks_hero_carousel" RENAME TO "_pages_v_blocks_product_hero_carousel";
  ALTER TABLE "pages_blocks_product_hero_carousel_slides" DROP CONSTRAINT "pages_blocks_hero_carousel_slides_parent_id_fk";
  
  ALTER TABLE "pages_blocks_product_hero_carousel" DROP CONSTRAINT "pages_blocks_hero_carousel_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_product_hero_carousel_slides" DROP CONSTRAINT "_pages_v_blocks_hero_carousel_slides_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_product_hero_carousel" DROP CONSTRAINT "_pages_v_blocks_hero_carousel_parent_id_fk";
  
  DROP INDEX "pages_blocks_hero_carousel_slides_order_idx";
  DROP INDEX "pages_blocks_hero_carousel_slides_parent_id_idx";
  DROP INDEX "pages_blocks_hero_carousel_order_idx";
  DROP INDEX "pages_blocks_hero_carousel_parent_id_idx";
  DROP INDEX "pages_blocks_hero_carousel_path_idx";
  DROP INDEX "_pages_v_blocks_hero_carousel_slides_order_idx";
  DROP INDEX "_pages_v_blocks_hero_carousel_slides_parent_id_idx";
  DROP INDEX "_pages_v_blocks_hero_carousel_order_idx";
  DROP INDEX "_pages_v_blocks_hero_carousel_parent_id_idx";
  DROP INDEX "_pages_v_blocks_hero_carousel_path_idx";
  ALTER TABLE "pages_blocks_product_hero_carousel_slides" ADD CONSTRAINT "pages_blocks_product_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_hero_carousel" ADD CONSTRAINT "pages_blocks_product_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_product_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_hero_carousel" ADD CONSTRAINT "_pages_v_blocks_product_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_product_hero_carousel_slides_order_idx" ON "pages_blocks_product_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_hero_carousel_slides_parent_id_idx" ON "pages_blocks_product_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_hero_carousel_order_idx" ON "pages_blocks_product_hero_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_hero_carousel_parent_id_idx" ON "pages_blocks_product_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_hero_carousel_path_idx" ON "pages_blocks_product_hero_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_hero_carousel_slides_order_idx" ON "_pages_v_blocks_product_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_hero_carousel_slides_parent_id_idx" ON "_pages_v_blocks_product_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_hero_carousel_order_idx" ON "_pages_v_blocks_product_hero_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_hero_carousel_parent_id_idx" ON "_pages_v_blocks_product_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_hero_carousel_path_idx" ON "_pages_v_blocks_product_hero_carousel" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_product_hero_carousel_slides" RENAME TO "pages_blocks_hero_carousel_slides";
  ALTER TABLE "pages_blocks_product_hero_carousel" RENAME TO "pages_blocks_hero_carousel";
  ALTER TABLE "_pages_v_blocks_product_hero_carousel_slides" RENAME TO "_pages_v_blocks_hero_carousel_slides";
  ALTER TABLE "_pages_v_blocks_product_hero_carousel" RENAME TO "_pages_v_blocks_hero_carousel";
  ALTER TABLE "pages_blocks_hero_carousel_slides" DROP CONSTRAINT "pages_blocks_product_hero_carousel_slides_parent_id_fk";
  
  ALTER TABLE "pages_blocks_hero_carousel" DROP CONSTRAINT "pages_blocks_product_hero_carousel_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_carousel_slides" DROP CONSTRAINT "_pages_v_blocks_product_hero_carousel_slides_parent_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero_carousel" DROP CONSTRAINT "_pages_v_blocks_product_hero_carousel_parent_id_fk";
  
  DROP INDEX "pages_blocks_product_hero_carousel_slides_order_idx";
  DROP INDEX "pages_blocks_product_hero_carousel_slides_parent_id_idx";
  DROP INDEX "pages_blocks_product_hero_carousel_order_idx";
  DROP INDEX "pages_blocks_product_hero_carousel_parent_id_idx";
  DROP INDEX "pages_blocks_product_hero_carousel_path_idx";
  DROP INDEX "_pages_v_blocks_product_hero_carousel_slides_order_idx";
  DROP INDEX "_pages_v_blocks_product_hero_carousel_slides_parent_id_idx";
  DROP INDEX "_pages_v_blocks_product_hero_carousel_order_idx";
  DROP INDEX "_pages_v_blocks_product_hero_carousel_parent_id_idx";
  DROP INDEX "_pages_v_blocks_product_hero_carousel_path_idx";
  ALTER TABLE "pages_blocks_hero_carousel_slides" ADD CONSTRAINT "pages_blocks_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_carousel" ADD CONSTRAINT "pages_blocks_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_carousel" ADD CONSTRAINT "_pages_v_blocks_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_carousel_slides_order_idx" ON "pages_blocks_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_carousel_slides_parent_id_idx" ON "pages_blocks_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_carousel_order_idx" ON "pages_blocks_hero_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_carousel_parent_id_idx" ON "pages_blocks_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_carousel_path_idx" ON "pages_blocks_hero_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_carousel_slides_order_idx" ON "_pages_v_blocks_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_carousel_slides_parent_id_idx" ON "_pages_v_blocks_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_carousel_order_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_carousel_parent_id_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_carousel_path_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_path");`)
}
