import { headerConst } from '@constants/header';

export class JWTConfig {
  static secret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : `${headerConst.PREFIX}secret`;
}
