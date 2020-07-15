import { Request, Response } from 'express';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jwt-simple';
import { JWTConfig } from '@config/jwt.conf';

/* Libs */
import { ManageError } from '@libs/manage-error';

/* Entities */
import { User } from '@api/user/entity/user-entity';

/* Business logics */
import { UserBusinessLogic } from '../../user/bl/user-bl';

/* Handlers */
import { apiErrorHandler } from '@handler/error-handler';

/* Utils */
import { Validation } from '@utils/Validation';

export class AuthController {
  private user: UserBusinessLogic;

  constructor() {
    this.user = new UserBusinessLogic();
  }

  /**
   * Login `User`
   */
  async login(req: Request, res: Response) {
    const PARAM_EMAIL: string = 'email';
    const PARAM_PASSWORD: string = 'password';

    if (!req.body[PARAM_EMAIL] || !req.body[PARAM_PASSWORD]) {
      throw new ManageError(403, 'missing-params', 'Missing params');
    }

    const email = req.body[PARAM_EMAIL];
    const password = req.body[PARAM_PASSWORD];

    try {
      const user = await this.user.getByEmailSelectPassword(email);
      if (!user) {
        throw new ManageError(404, 'user-not-found', 'User not found');
      }
      if (!bcrypt.compareSync(password, user.password)) {
        throw new ManageError(403, 'user-invalid-password', 'Invalid password');
      }
      const token = jwt.encode({ _id: user._id }, JWTConfig.secret);
      this.user.deleteSelectPassword([user]);
      res.status(200).json({
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      apiErrorHandler(error, req, res);
    }
  }

  /**
   * Register `User`
   */
  async register(req: Request, res: Response) {
    try {
      const userBody = req.body?.user;
      let user = new User();
      user.firstName = userBody.firstName;
      user.lastName = userBody.lastName;
      user.email = userBody.email;
      user.phone = userBody.phone;
      user.sex = userBody.sex;
      user.phoneTypeId = userBody.phoneTypeId;
      user.password = await this.user.getHash(userBody.password);

      if (!Validation.isEmail(user.email)) {
        throw new ManageError(403, 'invalid-email', 'invalid-email');
      }

      const emailExist = await this.user.getByEmail(user.email);
      if (emailExist) {
        throw new ManageError(403, 'user-email-exist', 'Email exist');
      }

      user = await this.user.create(user);
      delete user.password;
      const token = jwt.encode({ _id: user._id }, JWTConfig.secret);

      res.status(201).json({
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      apiErrorHandler(error, req, res);
    }
  }
}
