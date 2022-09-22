/**
 * 객체 통째로 넘기기
 */
const alerts = [];
export function temperatureAlerts(room, plan) {
  if (!plan.withinRange(room.daysTempRange)) {
    alerts.push('room temperature went outside range');
  }

  return alerts;
}

export class HeatingPlan {
  constructor(temperatureRange) {
    this._temperatureRange = temperatureRange;
  }

  withinRange(range) {
    return (
      range.bottom >= this._temperatureRange.low && range.top <= this._temperatureRange.high
    );
  }
}
