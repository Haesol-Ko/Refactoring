class Performance {
    #audience;
    #play;
    constructor(audience, play) {
        this.#audience = audience;
        this.#play = play;
    }

    get audience() {
        return this.#audience;
    }

    get play() {
        return this.#play;
    }

    // 생성할 때 쉽도록 팩터리함수 만들기. 여기서는 switch 써도 됨
    static create(audience, play) {
        switch (play.type) {
            case 'tragedy':
                return new Tragedy(audience, play);
            case 'comedy':
                return new Comedy(audience, play);
                // null객체를 만들던 오류를 던지던 선택!
            default:
                throw new Error(`알 수 없는 타입!: ${play.type}`);
        }
    }
}

class Tragedy extends Performance {
    get amount() {
        const base = 40000;
        return this.audience > 30 ? base + 1000 * (this.audience - 30) : base;
    }

    get credit() {
        return Math.max(this.audience - 30, 0);
    }
}

class Comedy extends Performance {
    get amount() {
        let result = 30000;
        if (this.audience > 20) {
            result += 10000 + 500 * (this.audience - 20);
        }
        result += 300 * this.audience;

        return result;
    }

    // 뭐가 뭘 의미하는지 따로 변수를 추출해서 뭘 의미하는지 알려주면 더 좋다!
    get credit() {
        return Math.max(this.audience - 30, 0) + Math.floor(this.audience / 5);
    }
}

export class Statement {
    #customer;
    #performances;
    constructor(invoice, plays) {
        this.#customer = invoice.customer;
        this.#performances = invoice.performances.map(p => Performance.create(p.audience, plays[p.playID]));
    }
    get customer() {
        return this.#customer;
    }

    get performances() {
        return [...this.#performances];
    }

    get totalCredits() {
        return this.#performances.reduce(
            (sum, p) => (sum += p.credit)
            , 0);
    }

    get totalAmount() {
        return this.#performances.reduce(
            (sum, p) => (sum += p.amount)
            , 0);
    }
}

export function createStatement(invoice, plays) {
    return new Statement(invoice, plays);
}