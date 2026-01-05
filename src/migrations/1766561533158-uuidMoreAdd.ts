import { MigrationInterface, QueryRunner } from "typeorm";

export class UuidMoreAdd1766561533158 implements MigrationInterface {
    name = 'UuidMoreAdd1766561533158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "micro_post" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "micro_post" ADD CONSTRAINT "UQ_f6709e475130af3cf55b87a3663" UNIQUE ("uuid")`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "UQ_96102ee3fa43a27bc51bb91f3ca" UNIQUE ("uuid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "UQ_96102ee3fa43a27bc51bb91f3ca"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "uuid"`);
        await queryRunner.query(`ALTER TABLE "micro_post" DROP CONSTRAINT "UQ_f6709e475130af3cf55b87a3663"`);
        await queryRunner.query(`ALTER TABLE "micro_post" DROP COLUMN "uuid"`);
    }

}
