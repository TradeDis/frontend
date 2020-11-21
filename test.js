const ws = new WebSocket('wss://echo.websocket.org/');
// Connection opened
ws.addEventListener('open', (event) => {
    ws.send('Hello Server!');
});

ws.onopen = function (e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    ws.send("My name is John");
};
