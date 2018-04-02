import winston from 'winston';
import { format } from 'logform';

const coloredFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);
export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ format: coloredFormat }),
    ],
    level: `silly`,
});