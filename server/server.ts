// import inbuilt http module;
import http from "http";

// import default config
import { defaultConfig } from "./config/config";

// import app
import { app } from "./app";

// creating server
const server = http.createServer(app);

// server listen
server.listen(process.env.PORT || defaultConfig?.PORT , () => {
    console.log(`Listening on port ${defaultConfig?.PORT}`)
});