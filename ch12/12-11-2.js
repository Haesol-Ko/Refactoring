class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

// 현재 방식(=책의 방식)
// catalog를 repository로 바꾸고 catalogId를 이용해 해당하는 catalog를 받아온다.
// 엘리 왈: 이러면 Scroll과 catalog간의 커플링이 심해지므로
// 바깥에서 catalog를 만들어 catalog만 의존성 주입하는게 나음.
class Scroll {
  constructor(id, dataLastCleaned, catalogId, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogId);
    this._lastCleaned = dataLastCleaned;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._catalogItem.title;
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500;

    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
