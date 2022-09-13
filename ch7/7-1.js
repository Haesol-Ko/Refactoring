/**
 * record => key: value
 */

class Organization {
    #data;
    #name;
    #country;

    /**
     * 각각의 key를 하나하나 받아오는게 좋지만 (ex: constructor(name, country))
     * 백엔드와 통신하거나 외부모듈을 사용하면 레코드 형태로 올 수 있음.
     */
    constructor(data) {
        this.#data = data;
        this.#name = data.name;
        this.#country = data.country;
    }
    get name () {
        return this.#name;
    }
    get country () {
        return this.#country;
    }
    set name(value) {
        this.#name = value;
    }

    /**
     * setter 있으니까 getter 호출하여 실시간 객체 넘겨주기.
     * @returns {{country: *, name: *}}
     */
    get rawData() {
        return {name: this.name, country: this.country};
    }
}

const organization = new Organization({
    name: 'Acme Gooseberries',
    country: 'GB'
});

organization.name = 'Dream Coding';
console.log(organization.name);
console.log(organization.country);