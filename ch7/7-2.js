export class Person {
  #name;
  #courses;
  constructor(name) {
    this.#name = name;
    this.#courses = [];
  }

  get name() {
    return this.#name;
  }

  /**
   * 새로운 객체로 만들어서 넘겨주기 => 불변성 유지
   * @returns {*[]}
   */
  get courses() {
    return [...this.#courses];
  }

  /**
   * 코스 추가 함수 만들기
   * @param course
   */
  addCourse(course) {
    this.#courses.push(course);
  }

  /**
   * 코스 제거 함수 만들기
   * 배열에서 원하는 객체 찾는 법 꼭 기억!!! indexOf, just return or splice
   * runIfAbsent처럼 콜백함수를 받아와도 됨.
   * @param course
   * @param runIfAbsent
   */
  removeCourse(course, runIfAbsent) {
    const index = this.#courses.indexOf(course);
    if(index === -1) {
      runIfAbsent();
      return;
    }
    this.#courses.splice(index, 1);
  }
}

export class Course {
  #name;
  #isAdvanced;
  constructor(name, isAdvanced) {
    this.#name = name;
    this.#isAdvanced = isAdvanced;
  }

  get name() {
    return this.#name;
  }

  get isAdvanced() {
    return this.#isAdvanced;
  }
}

const ellie = new Person('엘리');
const course = new Course('리팩토링', true);
ellie.addCourse(course);
console.log(ellie.courses.length);
ellie.removeCourse(course, () => {console.log("해당 코스는 없다.")});
console.log(ellie.courses.length);
ellie.removeCourse(course, () => {console.log("해당 코스는 없다.")});

