/**
 * 특이 케이스 추가하기.
 * 1. unknown, null 값 등을 바로 넣거나 리턴하지 말고
 * 거기에 해당하는 클래스를 새로 만들어서 메서드를 override 한다.
 */

// 예제 1
class Hotel {
  constructor() {
    this.rooms = [];
  }

  addRoom(roomNumber) {
    this.rooms[roomNumber] = new Room(roomNumber);
  }

  emptyRoom(roomNumber) {
    this.rooms[roomNumber] = new EmptyRoom(roomNumber);
    // 만약 this.rooms[roomNumber] = null; 로 하면 room.clean()에서 오류 발생
  }

  cleanRooms() {
    this.rooms.forEach(room => room.clean());
  }
}

class Room {
  constructor(roomNumber){
    this.roomNumber = roomNumber;
  }

  clean() {
    console.log(`cleaning room {${this.roomNumber}}...`);
  }
}

/**
 * null, unknown 같은 특이 케이스일 때 만든 객체.
 */
class EmptyRoom extends Room {
  clean() {
    console.log(`Room {${this.roomNumber}} is empty.`);
  }
}

const hotel = new Hotel();
hotel.addRoom(0);
hotel.addRoom(1);
hotel.cleanRooms();
hotel.emptyRoom(1);
hotel.cleanRooms();

// 예제 2
export class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer === 'unknown'
        ? new UnknownCustomer(this._customer)
        : new Customer(this._customer);
  }
}

export class Customer {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    //
  }

  set billingPlan(arg) {
    //
  }

  get paymentHistory() {
    //
  }
}

class UnknownCustomer extends Customer {
  get name() {
    return 'occupant';
  }
}

// 사용하는 부분
export function customerName(site) {
  const aCustomer = site.customer;
  // 더 많은 코드가 여기에 있음
  return aCustomer.name;
}
