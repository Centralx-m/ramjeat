const apiKey = "your-api-key";
const secretKey = "your-secret";
const passphrase = "your-passphrase";

let pnl = 0;
let tradeInterval;

function updatePnLDisplay() {
  document.getElementById("live-pnl").innerText = pnl.toFixed(2) + " USDT";
}

async function updateRealPnL() {
  const orders = await fetchBitgetOrders(apiKey, secretKey, passphrase);
  let realizedPnL = 0;
  orders.forEach(order => {
    if (order.status === "filled") {
      realizedPnL += parseFloat(order.pnl || 0);
    }
  });
  pnl = realizedPnL;
  updatePnLDisplay();
}

function notifyBrowser(message) {
  if (Notification.permission === "granted") {
    new Notification("Bitget Bot", { body: message });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Bitget Bot", { body: message });
      }
    });
  }
}

document.getElementById("start-btn").onclick = () => {
  document.getElementById("bot-status").innerText = "Running";
  tradeInterval = setInterval(updateRealPnL, 10000);
};

document.getElementById("stop-btn").onclick = () => {
  document.getElementById("bot-status").innerText = "Stopped";
  clearInterval(tradeInterval);
};