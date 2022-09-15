export function reportYoungestAgeAndTotalSalary(people) {
  return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

  /**
   * 함수는 호이스팅이 되니까 호출코드 이후에 선언이 가능하다.
   */
  function youngestAge() {
    return Math.min(...people.map(p => p.age));
  }

  function totalSalary() {
    return people.reduce((total, p) => (total += p.salary), 0);
  }
}
