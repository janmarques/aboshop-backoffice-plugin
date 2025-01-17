chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange' || request.type === 'getTabChange') {
    console.log('executing shop script...');

    let shopUrl = window.location.href.toLowerCase();

    function getShopOfferFormulaId() {
      return sessionStorage.getItem('offerFormulaId');
    }

    function getShopOrderId() {
      return sessionStorage.getItem('orderId');
    }

    let shopEnvironment;

    if (shopUrl.includes('://testaboshop')) {
      shopEnvironment = 'test';
    } else if (shopUrl.includes('://previewaboshop')) {
      shopEnvironment = 'preview';
    } else if (shopUrl.includes('://aboshop')) {
      shopEnvironment = '';
    }

    let msg = {
      currentShopUrl: shopUrl,
      currentShopOfferFomulaId: getShopOfferFormulaId(),
      currentShopOrderId: getShopOrderId(),
      currentShopEnvironment: shopEnvironment,
    };
    chrome.runtime.sendMessage(msg);
  }
});
