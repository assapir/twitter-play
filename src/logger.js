import winston from 'winston';

export const logger = winston.createLogger({
    level: `silly`,
    color: true,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
});