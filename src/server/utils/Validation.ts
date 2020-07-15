import * as _ from 'lodash';

export class Validation {
  /**
   * Check if the value has a valid content
   * @param value
   */
  static isValid(value: any): boolean {
    if (value === null || typeof value === undefined || value === '') {
      return false;
    }
    return true;
  }

  /**
   * Check if the value has a valid email 
   * @param email 
   */
  static isEmail(email: string): boolean {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static validateQuotes(value: string): string {
    return value.replace(/[\'\"]/g, '');
  }
}
