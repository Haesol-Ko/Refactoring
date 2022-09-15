/**
 * 응집도에 따라서 함수 옮기기 - ver.class
 */

export class Account {
  constructor(accountType, daysOverdrawn) {
    this.type = accountType;
    this._daysOverdrawn = daysOverdrawn;
  }

  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += overdraftCharge(this.daysOverdrawn);
    return result;
  }

  get daysOverdrawn() {
    return this._daysOverdrawn;
  }
}

export class AccountType {
  constructor(type) {
    this._type = type;
  }
  get isPremium() {
    return this._type === 'Premium';
  }

  overdraftCharge(daysOverdrawn) {
    if (!this.isPremium) {
      return daysOverdrawn * 1.75;
    }
    const baseCharge = 10;

    return daysOverdrawn <= 7 ?
        baseCharge
        : baseCharge + (daysOverdrawn - 7) * 0.85;
  }
}

/**
 * else문이 짧다면 if(!) return 형식으로 else문 줄이기
 * 간단한 if else문이라면 ? : 이용하기
 */
// 고치기 전
function overdraftCharge (daysOverdrawn) {
  if (this.isPremium) {
    const baseCharge = 10;
    if (daysOverdrawn <= 7) {
      return baseCharge;
    } else {
      return baseCharge + (daysOverdrawn - 7) * 0.85;
    }
  } else {
    return daysOverdrawn * 1.75;
  }
}