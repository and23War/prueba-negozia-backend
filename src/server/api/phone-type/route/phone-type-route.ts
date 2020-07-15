import * as express from 'express';
import { PhoneTypeController } from '../controller/phone-type-controller';

export class PhoneTypeRoutes {
  static init(router: express.Router) {
    const phoneTypeController = new PhoneTypeController();
    router.route('/phoneType').get((req, res) => phoneTypeController.getAll(req, res));
  }
}
