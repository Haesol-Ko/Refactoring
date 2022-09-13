/**
 * 강의에서 나온 클래스로 묶으면 좋은 상황
 */
const telephone = "010-888-6666";
const gTelephone = '+82'+"010-888-6666";

class Telephone {
  constructor(number, countryCode) {}
}

export class Order {
  constructor(data) {
    this.priority = data.priority;
  }

  isHighPriority() {
    return 'high' === this.priority || 'rush' === this.priority
    // this.priority.higherThan('normal');
  }
}

/**
 * Priority를 이용할 상황이 지금보다 더 많다면 이렇게 따로 클래스로 빼서 써도 좋다.
 */
class Priority {
  #value;
  #index;
  constructor(value) {
    if (Priority.legalValues().includes(value)) {
      this.#value = value;
      this.#index = Priority.legalValues().indexOf(this.#value);
    } else {
      throw new Error(`${value} is invalid for Priority.`);
    }
    this.#value = value;
  }

  get index() {
    return Priority.legalValues().indexOf(this.#value);
  }

  equals(other) {
    return this.#index === other.index;
  }

  higherThan(other) {
    return this.#index > other.index;
  }

  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }
}

const orders = [
  new Order({ priority: 'normal' }),
  new Order({ priority: 'high' }),
  new Order({ priority: 'rush' }),
];

const highPriorityCount = orders.filter(
  (o) => (o.isHighPriority())).length;

console.log(highPriorityCount);
