import {printOwing} from "../6-1.js";

/**
 * 테스트용 가짜 클래스 만들기!
 */
class Console {
    #content = '';

    constructor() {}

    log(message) {
        this.#content += `${message}\n`;
    }

    get content() {
        return this.#content;
    }
}

/**
 * 테스트하기 좋도록 함수는 고정된 값을 반환하도록 바꿨다.
 */
class Clock {
    constructor() {}

    get today() {
        return {
            getFullYear() {
                return 2022;
            },
            getMonth() {
                return 0;
            },
            getDate() {
                return 21;
            }
        };
    }
}

describe('printOwing', () => {
    it('should print owing', () => {
        const invoice = {
            orders: [{ amount: 2 }, { amount: 5 }],
            customer: '엘리',
        };

        const expected =
            '***********************\n' +
            '**** Customer Owes ****\n'+
            '***********************\n' +
            'name: 엘리\n' +
            'amount: 7\n' +
            `due: 2/20/2022\n`;

        const console = new Console();
        const clock = new Clock();

        printOwing(invoice, console, clock);

        expect(console.content).toBe(expected);
    })
})
