import { MigrationInterface, QueryRunner } from "typeorm";

export class UuidAdd1766559911429 implements MigrationInterface {
    name = 'UuidAdd1766559911429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "uuid"`);
    }

}
