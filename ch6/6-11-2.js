import fs from 'fs';

// 1. run 함수를 만들어서 노드의 process 디펜던시를 제거함
run(process.argv);

// 2. 사용자에게 입력을 받아옴 -> 유효성 검사
// 3. 필요한 로직 처리
function run(args) {
  countOrders(parseCommand(args)); // 이처럼 인라인 하거나 변수에다 할당해도 됨.. 이해하기 편한대로..
}

function parseCommand(args) {
  if (!args[2]) {
    throw new Error('파일 이름을 입력하세요');
  }

  const fileName = `./${args[2]}.json`;
  if (!fs.existsSync(fileName)) {
    throw new Error('파일이 존재하지 않습니다');
  }

  // 객체로 반환하네
  // key === value면 ':' 안 써도 됨.
  return {
    fileName,
    countReadyOnly: args.includes('-r'), // 인라인
  };
}

// 구조분해
function countOrders({fileName, countReadyOnly}) {
  const rawData = fs.readFileSync(fileName);
  const orders = JSON.parse(rawData);
  const filtered = countReadyOnly ? orders.filter((order) => order.status === 'ready').length : orders.length;
  console.log(filtered);
}