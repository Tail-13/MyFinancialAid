import winston from 'winston';

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to log entries
    logFormat
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }), // Console transport for logging to the console
    new winston.transports.File({ filename: 'logs/app.log' }) // File transport to save logs in a file
  ]
});

export default logger;
