const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Keep track of all connected clients
const clients = new Set();

wss.on('connection', function connection(ws) {
  // Add the new client to the set
  clients.add(ws);

  ws.on('message', function incoming(message) {
    // Broadcast the message to all clients
    for (const client of clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  ws.on('close', function() {
    // Remove the client from the set when it disconnects
    clients.delete(ws);
  });
});
