import pino from "pino";
import dayjs from "dayjs";

export const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
});

export const logAccess = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    base: {
        pid: true
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
}, pino.destination({
    dest: "./logs/access.log"
}));

export const logError = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    base: {
        pid: true
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
}, pino.destination({
    dest: "./logs/error.log"
}));