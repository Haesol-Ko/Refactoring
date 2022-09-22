/**
 * 명령을 함수로 바꾸기
 * 특정한 데이터와 계산이 프로그램 전반적으로 재사용 된다면 필요한 데이터와 계산하는 함수를 클래스로 묶는다. (Command Object)
 * 하지만 계산이 단 한번만 필요한 경우라면 함수로 이용하는게 낫다.
 */
// export class ChargeCalculator {
//   constructor(customer, usage, provider) {
//     this._customer = customer;
//     this._usage = usage;
//     this._provider = provider;
//   }
//   get baseCharge() {
//     return this._customer.baseRate * this._usage;
//   }
//   get charge() {
//     return this.baseCharge + this._provider.connectionCharge;
//   }
// }

function calculateCharge(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}