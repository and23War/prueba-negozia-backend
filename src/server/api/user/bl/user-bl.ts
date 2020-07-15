import { ObjectID } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs';

/**
 * Libs
 */
import { ManageError } from '@libs/manage-error';

/**
 * Entities
 */
import { User } from '../entity/user-entity';

export class UserBusinessLogic {
  constructor() {}

  async getBy(query: object = {}) {
    const userList = await User.find(query);
    this.deleteSelectPassword(userList);
    return userList;
  }

  async getById(userId: string | ObjectID) {
    const user = await User.findOne(userId);
    if (user) this.deleteSelectPassword([user]);
    return user;
  }

  async getByEmail(email: string) {
    const user = await User.findOne({ email });
    if (user) this.deleteSelectPassword([user]);
    return user;
  }

  async create(userData: User) {
    const user = await userData.save();
    if (user) this.deleteSelectPassword([user]);
    return user;
  }

  async update(userData: User) {
    const user = await userData.save();
    if (user) this.deleteSelectPassword([user]);
    return user;
  }

  async delete(user: User) {
    return await user.remove();
  }

  /**
   * Get password hash
   * @param password: Password to hash
   */
  async getHash(password: string) {
    try {
      return bcrypt.hashSync(password);
    } catch (error) {
      throw new ManageError(403, 'invalid-password', 'Invalid password');
    }
  }

  /**
   * Get the user by email but does not remove the password attribute
   * @param email User email
   */
  async getByEmailSelectPassword(email: string) {
    const user = await User.findOne({ email });
    return user;
  }
  /**
   * The function is created while correcting the typeorm fix that allows to remove the
   * password to the users obtained with the proper { select: false } in the entity
   * @param userList Array of Users
   */
  deleteSelectPassword(userList: User[]) {
    userList.map((user: User) => delete user.password);
  }
}
