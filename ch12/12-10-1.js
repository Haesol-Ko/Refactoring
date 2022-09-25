/**
 * 🌟서브클래스를 위임으로 바꾸기
 * 존 나 어 려 워 . ㅠ ㅠ
 * 상속이 더 간단할 수 있고 컴포지션은 역참조 등 복잡도가 늘어나지만..
 * 한 번 밖에 사용하지 못하는 상속을 다른 목적으로 사용할 수 있게 되었다는 장점이 생김 !
 */

class Booking {
  #show;
  #date;
  #premiumDelegate;
  constructor(show, date) {
    this.#show = show;
    this.#date = date;
  }

  get show() {
    return this.#show
  }
  get date() {
    return this.#date;
  }

  get hasTalkback() {
    return this.#premiumDelegate
    ? this.#premiumDelegate.hasTalkback
    : this.#show.hasOwnProperty('talkback') && !this.isPeakDay;
  }

  // 방법1. super class에서 계산로직 분리하여 기존 basePrice에선 리턴값만 분기
  get _privateBasePrice() {
    let result = this.#show.price;

    if (this.isPeakDay) {
      result += Math.round(result * 0.15);
    }
    return result;
  }

  // get basePrice() {
  //   return (this.#premiumDelegate)
  //   ? this.#premiumDelegate.basePrice
  //   : this.#privateBasePrice;
  // }

  // 방법2. subclass에서 premiumfee에 대한 추가 로직을 담은 메서드 생성
  get basePrice() {
    let result = this.#show.price;

    if (this.isPeakDay) {
      result += Math.round(result * 0.15);
    }

    return this.#premiumDelegate
    ? this.#premiumDelegate.extendBasePrice(result)
        : result;
  }

  get hasDinner() {
    return this.#premiumDelegate ? this.#premiumDelegate.hasDinner : undefined;
  }

  #bePremium(extras) {
    // this를 통째로 넘겨줘서 host로 사용하는건 생각도 못했다!
    // 🌟 역참조 !!
    this.#premiumDelegate = new PremiumBookingDelegate(this, extras);
  }

  static createBooking(show, date) {
    return new Booking(show, date);
  }

  static createPremiumBooking(show, date, extras) {
    const result = new Booking(show, date);
    // result의 bePremium이니까 this가 result가 넘어가는게 맞네... 진짜 신기하다..
    result.#bePremium(extras);
    return result;
  }
}

class PremiumBookingDelegate {
  #host;
  #extras;
  constructor(host, extras) {
    this.#host = host;
    this.#extras = extras;
  }

  get hasTalkback() {
    return this.#host.show.hasOwnProperty('talkback');
  }

  get hasDinner() {
    return this.#extras.hasOwnProperty('dinner') && !this.isPeakDay;
  }

  // 방법 1
  get basePrice() {
    return Math.round(this._host._privateBasePrice + this.#extras.PremiumFee);
  }

  // 방법 2
  extendBasePrice(base) {
    return Math.round(base + this.#extras.PremiumFee);
  }
}

const booking = Booking.createBooking(show, date);
const premiumBooking = Booking.createPremiumBooking(show, date, extras);
