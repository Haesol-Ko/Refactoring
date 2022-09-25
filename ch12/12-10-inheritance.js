/**
 * 상속
 * 수직적인 관계로 코드를 재사용, 확장
 * 한계점:
 * - 딱 하나만 상속할 수 있음
 * - 부모클래스에 메서드를 추가하면 서브클래스들에도 자동적으로 메서드 추가됨.
 * - 상속을 사용하게 되면 수정이 어렵고 유지보수가 어려워짐.
 * => 정말 필요한 경우에만 사용하기 위해 상속 대신 위임을 사용하자.
 */
class Printer {
    print() {
        console.log('basic print!');
    }
}

class RedPrinter extends Printer {
    print() {
        console.log('print 🔴');
    }
}

const printers = [new Printer(), new RedPrinter()];
printers.forEach(printer => printer.print());
