/**
 * 서브클래스를 위임으로 바꾸기
 * : 서브클래스가 여러 개일 때
 * 진짜 최고로 어렵다...😭
 */
class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    // 생성자에서 팩터리 메서드를 사용해 객체를 만드네..🤯
    // 이것도 의존성 주입으로 외부에서 주입하는 것이 decoupling
    this._speciesDelgate = this.selectSpeciesDelegate(data);
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._speciesDelgate.plumage;
  }

  get airSpeedVelocity() {
    return this._speciesDelgate.airSpeedVelocity;
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case '유럽 제비':
        // 🌟 역참조!!!
        return new EuropeanSwallow(data, this);
      case '아프리카 제비':
        return new AfricanSwallow(data, this);
      case '노르웨이 파랑 앵무':
        return new NorwegianBlueParrot(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  }
}

class SpeciesDelegate {
  // 🌟 역참조 !!!!
  constructor(data, bird) {
    this._bird = bird;
  }
  get plumage() {
    return this._bird._plumage || '보통이다';
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends SpeciesDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }

  get plumage() {
    if (this._voltage > 100) {
      return '그을렸다';
    } else {
      return this._plumage || '예쁘다';
    }
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

function createBird(bird) {
  return new Bird(bird);
}

const bird = {type: '아프리카 제비', name: 'Ppippi', numberOfCoconuts: 13}
const swallow = createBird(bird);
console.log(swallow.airSpeedVelocity);