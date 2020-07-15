import { Request, Response } from 'express';
import * as _ from 'lodash';

/* Business logics */
import { PhoneTypeBusinessLogic } from '../bl/phone-type-bl';
import { apiErrorHandler } from '@handler/error-handler';

export class PhoneTypeController {

  /* `PhoneTypeBusinessLogic` object */
  phoneType: PhoneTypeBusinessLogic;

  constructor() {
    this.phoneType = new PhoneTypeBusinessLogic();
  }

  async getAll(req: Request, res: Response) {
    try {
      const phoneTypeList = await this.phoneType.getBy();
      res.status(200).json({
        data: { phoneTypeList },
      });
    } catch (error) {
      apiErrorHandler(error, req, res);
    }
  }

}
