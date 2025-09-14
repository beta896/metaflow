// @audit-clean: centralized logger with stream support and environment-aware formatting

import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: isProd
        ? winston.format.simple()
        : winston.format.colorize({ all: true }),
    }),
  ],
});

// 🔁 Stream interface for morgan
logger.stream = {
  write: message => logger.info(message.trim()),
};

export default logger;