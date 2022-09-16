/**
 * 값을 참조로 바꾸기
 * 불변성을 유지하지 않아도 되는 상황! -> respository pattern을 이용하면 좋다.
 */

const customerRepository = new CustomerRepository();
const order = new Order(data.number, customerRepository.registerCustomer(data.id));

class Order {
  constructor(number, customer) {
    this._number = number;
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}

class CustomerRepository {
  #customer;
  constructor() {
    this.#customer = new Map();
  }

  registerCustomer(id) {
    if (!this.#customer.has(id)) {
      this.#customer.set(id, new Customer(id));
    }
    return findCustomer(id);
  }

  findCustomer(id) {
    return this.#customer.get(id);
  }
}
