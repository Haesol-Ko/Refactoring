/**
 * 조건식 통합하기
 */
function disabilityAmount(employee) {
  if (isNotEligibleForDisability(employee)) {
    return 0
  }
  return 1;

  function isNotEligibleForDisability() {
    return (
        employee.seniority < 2
        || employee.monthsDisabled > 12
        || employee.isPartTime
    );
  }
}
