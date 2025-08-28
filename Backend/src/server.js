import { PORT } from "./config/config.js";
import { connectDB } from "./config/conn.js";
import { app } from "./app.js";
import https from "https";

// Force TLS 1.2+ for all outgoing HTTPS requests
https.globalAgent.options.minVersion = "TLSv1.2";
https.globalAgent.options.maxVersion = "TLSv1.3";


connectDB()
.then(() => {
    app.listen(8000, () => {
        console.log(`Service is running at port : ${PORT} 🚀`);
    })
})
.catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
})