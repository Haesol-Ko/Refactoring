/**
 * Change magic literal
 * 특정 값 상수에 할당해서 이해하기 쉽도록 하기.
 */
const STANDARD_GRAVITY = 0.81;
function potentialEnergy(mass, height) {
  return mass * STANDARD_GRAVITY * height;
}