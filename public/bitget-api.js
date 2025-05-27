async function fetchBitgetOrders(apiKey, secretKey, passphrase) {
  const timestamp = Date.now().toString();
  const method = "GET";
  const requestPath = "/api/mix/v1/order/history?symbol=BTCUSDT_UMCBL";
  const prehash = timestamp + method + requestPath;
  const signature = CryptoJS.HmacSHA256(prehash, secretKey).toString(CryptoJS.enc.Base64);
  const headers = {
    "ACCESS-KEY": apiKey,
    "ACCESS-SIGN": signature,
    "ACCESS-TIMESTAMP": timestamp,
    "ACCESS-PASSPHRASE": passphrase,
  };
  const response = await fetch("https://api.bitget.com" + requestPath, { headers });
  const data = await response.json();
  return data.data.orderList || [];
}
