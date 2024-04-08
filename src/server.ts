import { env } from "./env";
import { app } from "./app";

app.listen({
    host: '0.0.0.0', //acessivel pelos front
    port: env.PORT,
}).then(()=> { //aguarda a leitura e dps mostre:
    console.log('🚀 HTTP Server Running!');
})