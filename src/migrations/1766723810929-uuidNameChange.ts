import { MigrationInterface, QueryRunner } from "typeorm";

export class UuidNameChange1766723810929 implements MigrationInterface {
    name = 'UuidNameChange1766723810929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "micro_post" RENAME COLUMN "uuid" TO "user_uuid"`);
        await queryRunner.query(`ALTER TABLE "micro_post" RENAME CONSTRAINT "UQ_f6709e475130af3cf55b87a3663" TO "UQ_3a4f1f4ea052237e29b7558bc0d"`);
        await queryRunner.query(`ALTER TABLE "auth" RENAME COLUMN "uuid" TO "user_uuid"`);
        await queryRunner.query(`ALTER TABLE "auth" RENAME CONSTRAINT "UQ_96102ee3fa43a27bc51bb91f3ca" TO "UQ_415f34fc66ac4546d918d2205be"`);
        await queryRunner.query(`ALTER TABLE "micro_post" DROP CONSTRAINT "UQ_3a4f1f4ea052237e29b7558bc0d"`);
        await queryRunner.query(`ALTER TABLE "micro_post" ALTER COLUMN "user_uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "micro_post" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "UQ_415f34fc66ac4546d918d2205be"`);
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "user_uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "user_uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "auth" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "UQ_415f34fc66ac4546d918d2205be" UNIQUE ("user_uuid")`);
        await queryRunner.query(`ALTER TABLE "micro_post" ALTER COLUMN "user_uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "micro_post" ALTER COLUMN "user_uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "micro_post" ADD CONSTRAINT "UQ_3a4f1f4ea052237e29b7558bc0d" UNIQUE ("user_uuid")`);
        await queryRunner.query(`ALTER TABLE "auth" RENAME CONSTRAINT "UQ_415f34fc66ac4546d918d2205be" TO "UQ_96102ee3fa43a27bc51bb91f3ca"`);
        await queryRunner.query(`ALTER TABLE "auth" RENAME COLUMN "user_uuid" TO "uuid"`);
        await queryRunner.query(`ALTER TABLE "micro_post" RENAME CONSTRAINT "UQ_3a4f1f4ea052237e29b7558bc0d" TO "UQ_f6709e475130af3cf55b87a3663"`);
        await queryRunner.query(`ALTER TABLE "micro_post" RENAME COLUMN "user_uuid" TO "uuid"`);
    }

}
