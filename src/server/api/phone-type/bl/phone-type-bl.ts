import { PhoneType } from '../entity/phone-type-entity';

export class PhoneTypeBusinessLogic {
  constructor() {}

  async getBy(query: object = {}) {
    const phoneTypeList = await PhoneType.find(query);
    return phoneTypeList;
  }

  async getById(phoneTypeId: number) {
    const phoneType = await PhoneType.findOne(phoneTypeId);
    return phoneType;
  }

  async getByName(name: string) {
    const phoneType = await PhoneType.findOne({ name });
    return phoneType;
  }

  async create(phoneTypeData: PhoneType) {
    const newPhoneType = await phoneTypeData.save();
    return newPhoneType;
  }

  async update(phoneTypeData: PhoneType) {
    const phoneType = await phoneTypeData.save();
    return phoneType;
  }

  async delete(phoneType: PhoneType) {
    await phoneType.remove();
    return true;
  }
}
