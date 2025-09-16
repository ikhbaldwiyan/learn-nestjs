import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageProfile1758012747075 implements MigrationInterface {
    name = 'AddImageProfile1758012747075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "image"`);
    }

}
