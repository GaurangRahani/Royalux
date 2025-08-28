import mongoose from "mongoose"
import { DB_ATLAS,PORT} from "../config/config.js";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(DB_ATLAS, {
            dbName: "Royalux"
        });
        connectionInstance.connection.on("error", (error) => {
            console.log("MONGODB CONNECTION ERROR ", error);
            process.exit(1);
        });
        connectionInstance.connection.on("connected", () => {
            console.log("MONGODB CONNECTION ESTABLISHED");
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED ", error);
        process.exit(1)
    }
}
