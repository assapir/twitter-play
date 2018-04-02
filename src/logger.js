import winston from 'winston';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ],
    level: `silly`,
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    colorize: true,
    stringify: true,
    humanReadableUnhandledException: true,
    
});