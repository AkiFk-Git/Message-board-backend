import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedColumn1766734911513 implements MigrationInterface {
    name = 'AddDeletedColumn1766734911513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "micro_post" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "micro_post" ALTER COLUMN "user_uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "micro_post" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "user_uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "user_uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "micro_post" ALTER COLUMN "user_uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "micro_post" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "micro_post" DROP COLUMN "deleted_at"`);
    }

}
