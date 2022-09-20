/**
 * Add assertion
 * 개발단계에서는 assert 사용
 * 배포할 때는(production 버전에서는) 버그리포트시스템에 버그리포트만 하고 정상 작동하도록
 * 또는 다른 우아한 처리.. (number를 0으로 바꾼다던가 ...)
 */
import { strict as assert } from 'node:assert';
class Customer {
  constructor() {
    this.discountRate = 0;
  }

  applyDiscount(number) {
    assert(number>=0);
    return this.discountRate ? number - this.discountRate * number : number;
  }
}

new Customer().applyDiscount(-1);