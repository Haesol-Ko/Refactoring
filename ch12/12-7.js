/**
 * 서브클래스 제거하기
 * 서브클래스마다 다른 동작이 없고 타입만 다른 거라면 상속을 만드는것은 overengineering..
 */
class Person {
    #name;
    #genderCode;

    constructor(name, genderCode) {
        this.#name = name;
        this.#genderCode = genderCode;
    }

    get name() {
        return this.#name;
    }

    get genderCode() {
        return this.#genderCode;
    }

    get isMale() {
        return this.#genderCode === 'M';
    }

    static create(record) {
        switch (record.gender) {
            case 'M':
                return new Person(record.name, 'M');
            case 'F':
                return new Person(record.name, 'F');
            default:
                return new Person(record.name, 'X');
        }
    }
}

function loadFromInput(data) {
    const result = [];
    data.forEach((record) => {
        result.push(Person.create(record));
    });
    return result;
}

const people = loadFromInput([
    {name: '엘리', gender: 'F'},
    {name: '철수', gender: 'M'},
    {name: '밥', gender: 'M'},
]);
const numberOfMales = people.filter((p) => p.isMale).length;
console.log(numberOfMales);
