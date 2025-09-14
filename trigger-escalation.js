const signalR = require("@microsoft/signalr");
const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:3000/signalrHub")
  .build();

connection.start().then(() => {
  connection.invoke("BroadcastPhase", "ESCALATED");
  console.log("✅ ESCALATED phase broadcasted");
});
