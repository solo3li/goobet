const signalR = require("@microsoft/signalr");

async function runTest() {
  console.log("--- Starting E2E Test ---");
  const accountId = "1234567890";
  const password = "testpassword";

  // 1. Login
  console.log("1. Logging in...");
  const authRes = await fetch("http://127.0.0.1:8081/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountId, password })
  });
  const authData = await authRes.json();
  console.log("Auth Response:", authData);
  
  if(authData.accountId !== accountId) throw new Error("Login failed");

  // 2. Setup Predictor SignalR Connection
  console.log("2. Setting up Predictor SignalR connection...");
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://127.0.0.1:8081/gamehub")
    .build();

  let receivedGrid = false;
  let receivedActiveRow = -1;

  connection.on("ReceiveGameGrid", (grid) => {
    console.log("Predictor received Grid of length:", grid.length);
    receivedGrid = true;
  });

  connection.on("ReceiveActiveRow", (row) => {
    console.log("Predictor received ActiveRow update:", row);
    receivedActiveRow = row;
  });

  await connection.start();
  console.log("SignalR connected. Subscribing to accountId:", accountId);
  await connection.invoke("SubscribeToSession", accountId);
  
  // 3. Start Game
  console.log("3. Starting Game...");
  const startRes = await fetch("http://127.0.0.1:8081/api/game/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ betAmount: 10, playerId: accountId })
  });
  const startData = await startRes.json();
  console.log("Start Game Response:", startData);
  
  if(!startData.sessionId) throw new Error("Failed to start game");
  const sessionId = startData.sessionId;

  // Wait a bit for SignalR events
  await new Promise(r => setTimeout(r, 500));

  if(!receivedGrid || receivedActiveRow !== 0) {
    throw new Error("SignalR did not receive initial grid or row 0");
  }

  // 4. Play Game (Row 0, Col 0)
  console.log("4. Playing row 0, col 0...");
  const playRes = await fetch("http://127.0.0.1:8081/api/game/play", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, row: 0, col: 0 })
  });
  const playData = await playRes.json();
  console.log("Play Game Response:", playData);

  // Wait for SignalR events
  await new Promise(r => setTimeout(r, 500));

  if (playData.status === "won" && receivedActiveRow !== 1) {
    throw new Error("SignalR did not receive active row 1");
  }

  console.log("--- E2E Test Passed Successfully! ---");
  await connection.stop();
}

runTest().catch(err => {
  console.error("Test Failed:", err);
  process.exit(1);
});
