import winston from 'winston';

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${level}]${timestamp}: ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to log entries
    winston.format.colorize({all: true}), // Add colorization to the whole log entry (level and message)
    logFormat // Use the custom log format
  ),
  transports: [
    new winston.transports.Console({ 
      format: winston.format.combine(
        winston.format.colorize({all: true}), // Add color to entire log message
        logFormat // Apply custom log format for console logs
      )
    }), // Console transport for logging to the console
    new winston.transports.File({ 
      filename: 'logs/app.log',
      format: winston.format.combine(
        winston.format.timestamp(), // Include timestamp for file logs
        logFormat // Use the same custom format for file logs
      )
    }) // File transport to save logs in a file
  ]
});

export default logger;
