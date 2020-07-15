import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, ObjectIdColumn, ObjectID } from 'typeorm';
import { Length } from 'class-validator';

/**
 * Entities
 */
import { PhoneType } from '../../phone-type/entity/phone-type-entity';
import { UserSex } from './user-sex-entity';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  // tslint:disable-next-line: variable-name
  _id: ObjectID;

  @Column({ length: 100 })
  @Length(4, 100)
  firstName: string;

  @Column({ length: 100 })
  @Length(4, 100)
  lastName: string;

  @Column({ length: 250 })
  @Length(6, 250)
  email: string;

  @Column({
    type: 'enum',
    enum: UserSex,
  })
  sex: UserSex;

  @Column({ select: false })
  password: string;

  @Column({ length: 45 })
  @Length(7, 45)
  phone: string;

  @Column()
  phoneTypeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Relations
   */
  @ManyToOne(() => PhoneType, (phoneType: PhoneType) => phoneType.userList)
  @JoinColumn([{ name: 'phoneTypeId' }])
  phoneType: PhoneType;
}
