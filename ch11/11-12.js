/**
 * 오류코드를 예외로 바꾸기
 */
function localShippingRules(data) {
  if (data) return new ShippingRules(data);
  else throw new OrderProcessingError(-23);
}

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super();
    this.errorCode = errorCode;
  }
}
try {
  const result = localShippingRules();
} catch (e) {
  if(e instanceof OrderProcessingError) {
    console.log(e);
  }
}
