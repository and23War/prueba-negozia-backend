import { Entity, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm';
import { Length } from 'class-validator';

/**
 * Entities
 */
import { User } from '@api/user/entity/user-entity';

@Entity()
export class PhoneType extends BaseEntity {
  @ObjectIdColumn()
  // tslint:disable-next-line: variable-name
  _id: number;

  @Column({ length: 100 })
  @Length(4, 100)
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * Relations
   */
  @OneToMany(() => User, (user: User) => user.phoneType)
  userList: User[];
}
