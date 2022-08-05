import mongoose from "mongoose";
import config from "config";
import { logAccess, logError, logger } from "./logger.util";

const dbConnect = async function() {
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        logAccess.info(`Database connected to ${dbUri}.`);
    } catch(error: any) {
        logError.error(`${error}`);
        logger.error(`Error connecting to database ${error}`);
        process.exit(1);
    }

}

export default dbConnect;
