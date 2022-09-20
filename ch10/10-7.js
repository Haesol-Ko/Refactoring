/**
 * 제어 플래그를 탈출문으로 바꾸기
 */
const people = ['a', 'b', 'c', 'Don', 'e', 'f'];

for (const p of people) {
    if (p === 'Don') {
        sendAlert();
        break;
    }
}

function sendAlert() {
    console.log('found it');
}