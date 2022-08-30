import _ from 'lodash';
const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 };

export function acquireReading() {
  return reading;
}
export function enrichReading(original) {
  // const result = {...original} or Object.assign => 얕은 복사
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(
      0,
      result.baseCharge - taxThreshold(result.year));
  return result;
}

function calculateBaseCharge(reading) {
  return baseRate(reading.month, reading.year) * reading.quantity;
}

export function baseRate(month, year) {
  if (year === 2017 && month === 5) return 0.1;
  return 0.2;
}

/**
 * 변환함수로 묶기 보다는 class로 묶는 걸 추천
 * class의 get을 사용하면 변수가 변경되어도 변수를 사용할 때마다 변수를 가져오는데
 * 변환함수에서는 변수에 값이 저장되어 바뀌지 않으므로 값이 변경되어도 바뀐 값을 사용하지 않을 수 있음.
 * 따라서 값이 절대 변하지 않을 경우에만 변환함수 사용 가능하지만 변환함수 섞어서 쓰느니 클래스로만 사용하는게 깔끔하다.
 */
