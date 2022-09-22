/**
 * 생성자를 팩터리 함수로 바꾸기
 * 자바스크립트에선 private constructor 지원되지 않지만
 * 일반적으로 팩토리 함수를 만들 땐 constructor를 private하게 만들고 객체를 만들 수 있는 함수를 만든다.
 * 인스턴스를 만드는 로직을 캡슐화하고 외부에서는 더 간결하고 손쉽게 인스턴스를 만들기 위해서 사용한다.
 */
export class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() {
    return this._name;
  }

  // get type() {
  //   return Employee.legalTypeCodes[this._typeCode];
  // }
  //
  // static get legalTypeCodes() {
  //   return { E: 'Engineer', M: 'Manager', S: 'Salesman' };
  // }

  static createEngineer(name) {
    return new Employee(name, 'E');
  }

  static createManger(name) {
    return new Employee(name, 'M');
  }
  static createSalesman(name) {
    return new Employee(name, 'S');
  }
}

const employee = Employee.createSalesman('Jesse');