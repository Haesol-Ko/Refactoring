/**
 * 중개자 제거하기
 *
 * 중개자 = 로직이나 역할 없이 단순히 데이터만 가지고 있는 클래스.
 * 불필요하게 중간다리가 하나 더 생김. => 하나의 클래스로 합치는 게 나을 수도 있음.
 */

class Person {
    #name;
    #manager;
    #chargeCode;
    constructor(name, manager, chargeCode) {
        this.#name = name;
        this.#manager = manager;
        this.#chargeCode = chargeCode;
    }

    get name() {
        return this.#name;
    }

    get manager() {
        return this.#manager;
    }

    get chargeCode() {
        return this.#chargeCode;
    }
}

const person = new Person('Tom', 'aManager', '999');
console.log(person.name);
console.log(person.manager);
console.log(person.chargeCode);
