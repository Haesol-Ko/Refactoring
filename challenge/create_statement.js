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

    get amount() {
        let result = 0;
        switch (this.#play.type) {
            case 'tragedy':
                result = 40000;
                if (this.#audience > 30) {
                    result += 1000 * (this.#audience - 30);
                }
                break;
            case 'comedy':
                result = 30000;
                if (this.#audience > 20) {
                    result += 10000 + 500 * (this.#audience - 20);
                }
                result += 300 * this.#audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${this.#play.type}`);
        }
        return result;
    }

    get credit() {
        let result = 0;
        result = Math.max(this.#audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if ('comedy' === this.#play.type) {
            result += Math.floor(this.#audience / 5);
        }
        return result;
    }

    get play() {
        return this.#play;
    }
}

export function createStatement(invoice, plays) {
    const statement = {};
    statement.customer = invoice.customer;
    statement.performances = invoice.performances.map(p => new Performance(p.audience, plays[p.playID])); // 전달하는 인자와 호출하는 변수가 같다면 생략 가능.. (p=>enrich(p)) === (enrich)
    statement.totalAmount = totalAmount(statement.performances);
    statement.totalCredits = totalCredits(statement.performances);
    return statement;

    function totalCredits(performances) {
        return performances.reduce(
            (sum, p) => (sum += p.credit)
            , 0);
    }

    function totalAmount(performances) {
        return performances.reduce(
            (sum, p) => (sum += p.amount)
            , 0);
    }
}