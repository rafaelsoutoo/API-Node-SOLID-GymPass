import { app } from "./app";

app.listen({
    host: '0.0.0.0', //facilitar com o front
    port: 3333,
}).then(()=> { //aguarda a leituta e dps mostre:
    console.log('🚀 HTTP Server Running!');
})