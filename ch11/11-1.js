/**
 * 질의 함수와 변경 함수 분리하기
 */
// 예제 1
function getTotalOutstanding() {
  return customerRepository.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
}

// 예제 2
export function alertForMiscreant(people, alarm) {
  const miscreant = findMiscreant(people);
  setOffAlarms(alarm, miscreant);
}

function findMiscreant(people) {
  for (const p of people) {
    if (p === 'Don') {
      return 'Don';
    }
    if (p === 'John') {
      return 'John';
    }
  }
  return '';
}

function setOffAlarms(alarm, p) {
  alarm.setOff('Found Miscreant ' + p);
}
