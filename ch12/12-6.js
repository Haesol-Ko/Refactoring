/**
 * 타입 코드를 서브클래스로 바꾸기
 * 외부에서 어떤 타입을 전달해야하는지 호출자는 알기 힘듦. 따라서 사용하는 쪽에서 사용하기 편하게 만드는 게 좋은 API
 */
class Employee {
    #name;
    #type;

    constructor(name) {
        // 💩 생성자에서 에러를 던지는 건 매우 나쁜 Practice!
        // 또한 외부에서 실수할 수 있는 코드에 대해서 validate 하는 것도 좋지 않음.
        // this.validateType(type);
        this.#name = name;
    }

    // validateType(arg) {
    //     if (!['engineer', 'manager', 'salesperson'].includes(arg)) {
    //         throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    //     }
    // }

    get type() {
        return 'employee';
    }

    toString() {
        return `${this.#name} (${this.type})`;
    }

    // 어떤 것을 생성해야할 지 모르는 상황일 때는 팩터리 메서드 사용
    // ex) 서버에서 json 등을 받아와 인스턴스 생성할 때..
    static createEmployee(name, type) {
        switch (type) {
            case 'engineer':
                return new Engineer(name);
            case 'salesperson':
                return new Engineer(name);
            case 'manager':
                return new Engineer(name);
            default:
                throw new Error(`${type}라는 직원 유형은 없습니다.`);
        }
    }
}

class Engineer extends Employee {
    get type() {
        return 'engineer';
    }
}

class Manager extends Employee {
    get type() {
        return 'manager';
    }
}

class Salesperson extends Employee {
    get type() {
        return 'salesperson';
    }
}

const ellie = new Engineer('엘리');
console.log(ellie.toString());
const bob = new Manager('밥');
