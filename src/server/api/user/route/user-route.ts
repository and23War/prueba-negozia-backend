import { Router } from 'express';
import { UserController } from '../controller/user-controller';

/**
 * Policies
 */
import { ExistUserPolicy } from '@policy/exist-user-policy';

export class UserRoutes {
  private static nameRoute = '/user';

  static init(router: Router) {
    this.initPolicies(router);

    const userController = new UserController();

    router.route(`${this.nameRoute}`).get((req, res) => userController.getAll(req, res));

    router
      .route(`${this.nameRoute}/:userId([0-9a-f]{24})`)
      .put((req, res) => userController.updateById(req, res))
      .delete((req, res) => userController.delete(req, res));
  }

  /**
   * Initialize policy list
   * @param router
   */
  static initPolicies(router: Router): void {
    router.use(`${this.nameRoute}/:userId([0-9a-f]{24})`, ExistUserPolicy.init);
  }
}
