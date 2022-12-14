/**
 * ๐์๋ธํด๋์ค๋ฅผ ์์์ผ๋ก ๋ฐ๊พธ๊ธฐ
 * ์กด ๋ ์ด ๋ ค ์ . ใ  ใ 
 * ์์์ด ๋ ๊ฐ๋จํ  ์ ์๊ณ  ์ปดํฌ์ง์์ ์ญ์ฐธ์กฐ ๋ฑ ๋ณต์ก๋๊ฐ ๋์ด๋์ง๋ง..
 * ํ ๋ฒ ๋ฐ์ ์ฌ์ฉํ์ง ๋ชปํ๋ ์์์ ๋ค๋ฅธ ๋ชฉ์ ์ผ๋ก ์ฌ์ฉํ  ์ ์๊ฒ ๋์๋ค๋ ์ฅ์ ์ด ์๊น !
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

  // ๋ฐฉ๋ฒ1. super class์์ ๊ณ์ฐ๋ก์ง ๋ถ๋ฆฌํ์ฌ ๊ธฐ์กด basePrice์์  ๋ฆฌํด๊ฐ๋ง ๋ถ๊ธฐ
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

  // ๋ฐฉ๋ฒ2. subclass์์ premiumfee์ ๋ํ ์ถ๊ฐ ๋ก์ง์ ๋ด์ ๋ฉ์๋ ์์ฑ
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
    // this๋ฅผ ํต์งธ๋ก ๋๊ฒจ์ค์ host๋ก ์ฌ์ฉํ๋๊ฑด ์๊ฐ๋ ๋ชปํ๋ค!
    // ๐ ์ญ์ฐธ์กฐ !!
    this.#premiumDelegate = new PremiumBookingDelegate(this, extras);
  }

  static createBooking(show, date) {
    return new Booking(show, date);
  }

  static createPremiumBooking(show, date, extras) {
    const result = new Booking(show, date);
    // result์ bePremium์ด๋๊น this๊ฐ result๊ฐ ๋์ด๊ฐ๋๊ฒ ๋ง๋ค... ์ง์ง ์ ๊ธฐํ๋ค..
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

  // ๋ฐฉ๋ฒ 1
  get basePrice() {
    return Math.round(this._host._privateBasePrice + this.#extras.PremiumFee);
  }

  // ๋ฐฉ๋ฒ 2
  extendBasePrice(base) {
    return Math.round(base + this.#extras.PremiumFee);
  }
}

const booking = Booking.createBooking(show, date);
const premiumBooking = Booking.createPremiumBooking(show, date, extras);
