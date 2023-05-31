// This is a list of all connected clients
const clients = [];

// This function is called when a client connects
function onConnection(client) {
    // Add the client to the list of connected clients
    clients.push(client);

    // This function is called when the client sends a message
    client.on('message', function(message) {
        // Parse the message as JSON
        const data = JSON.parse(message);

        // If the message is a 'move' message, send it to all other clients
        if (data.type === 'move') {
            for (const otherClient of clients) {
                if (otherClient !== client) {
                    otherClient.send(message);
                }
            }
        }
    });

    // This function is called when the client disconnects
    client.on('close', function() {
        // Remove the client from the list of connected clients
        const index = clients.indexOf(client);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
}
