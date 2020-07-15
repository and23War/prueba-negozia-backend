import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { phoneTypeSeed } from '../../../seeds/PhoneTypeSeed';

export class PhoneTypeSeed1594675980750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await getRepository('phone_type').save(phoneTypeSeed);
  }

  public async down(queryRunner: QueryRunner) {
    await getRepository('phone_type').clear();
  }
}
