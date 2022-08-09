import cluster from "cluster";
import { cpus} from "os";
import { logger } from "./utils/logger.util";
import bootstrap from "./app";

const numCPUs = cpus().length;

function init() {
    if(process.env.NODE_ENV !== "production") {
        return bootstrap();
    }
    
    if(cluster.isPrimary) {
        logger.info(`Primary process ${process.pid} is running.`);
    
        for(let i = 0;i < numCPUs; i++) {
            cluster.fork();
        }
    
        cluster.on("exit", (worker, code, signal) => {
            logger.error(`Worker stopped ${code} process ${worker.process.pid}.`);
            cluster.fork();
        });
    
        cluster.on("online", (worker) => {
            logger.info(`Worker process ${worker.process.pid} is running.`);
        });
    } else {
        bootstrap();
    }
}

init();
