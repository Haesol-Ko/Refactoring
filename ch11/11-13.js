/**
 * 예외를 사전확인으로 바꾸기
 * Exception 은 우리가 예상할 수 있는 나쁜 케이스에 대해서 처리하는 것이 아님
 * 예상 가능한 상황들: Happy path, Unhappy path, 성공케이스, 실패케이스 .. 각각의 상황에 맞게 코드를 작성
 * 정말 예외가 필요한 예외 상황: 파일을 받아야하는데 파일을 찾을 수 없을 때의 예외, 네트워크 통신이 갑자기 두절될 때 등..
 */
const values = [];
function getValueForPeriod(periodNumber) {
  return values[periodNumber] ?? 0;
  // 예상 가능한 오류 상황들.. periodNumber < 0 || periodNumber >= values.length
}

getValueForPeriod(-10);
