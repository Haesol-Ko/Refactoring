class Person {
  #lastName;
  #firstName;

  constructor(data) {
    this.#firstName = data.firstName;
    this.#lastName = data.lastName;
  }

  get lastName() {
    return this.#lastName;
  }
  get firstName() {
    return this.#firstName;
  }
}
let defaultOwner = new Person({ firstName: '마틴', lastName: '파울러' });

export function getDefaultOwner() {
  return defaultOwner;
}