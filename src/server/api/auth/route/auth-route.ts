import * as express from 'express';
import { AuthController } from '../controller/auth-controller';

export class AuthRoutes {
  private static nameRoute = '/auth';

  static init(router: express.Router) {
    const authController = new AuthController();
    router.route(`${this.nameRoute}/login`).post((req, res) => authController.login(req, res));

    router.route(`${this.nameRoute}/register`).post((req, res) => authController.register(req, res));
  }
}
