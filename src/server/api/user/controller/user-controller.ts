import { Request, Response } from 'express';
import { validate } from 'class-validator';
import * as _ from 'lodash';

/* Libs */
import { ManageError } from '@libs/manage-error';

/* Entities */
import { User } from '../entity/user-entity';

/* Business logics */
import { UserBusinessLogic } from '../bl/user-bl';

/* Handlers */
import { apiErrorHandler } from '@handler/error-handler';

export class UserController {
  private user: UserBusinessLogic;

  constructor() {
    this.user = new UserBusinessLogic();
  }

  async getAll(req: Request, res: Response) {
    try {
      const userList = await this.user.getBy({});

      res.status(200).json({
        data: { userList },
      });
    } catch (error) {
      apiErrorHandler(error, req, res);
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      const targetKey: string = 'targetUser';
      const user: User = req[targetKey];
      const userBody = req.body;
      user.firstName = userBody.firstName;
      user.lastName = userBody.lastName;
      user.sex = userBody.sex;
      user.phone = userBody.phone;
      user.phoneTypeId = userBody.phoneTypeId;

      const errors = await validate(user);
      if (errors.length > 0) {
        throw new ManageError(400, ''.concat(errors[0].property, '-', Object.keys(errors[0].constraints)[0]), '');
      }

      const updateUser = await this.user.update(user);

      res.status(200).json({
        data: { user: updateUser },
      });
    } catch (error) {
      apiErrorHandler(error, req, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const targetKey: string = 'targetUser';
      const user: User = req[targetKey];
      await this.user.delete(user);
      res.status(200).json({ user });
    } catch (error) {
      apiErrorHandler(error, req, res);
    }
  }
}
