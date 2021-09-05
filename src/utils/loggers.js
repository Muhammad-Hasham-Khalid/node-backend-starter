import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import chalk from 'chalk';

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'access.log'),
  {
    flags: 'a',
  }
);

// setup the access logger with morgan
export const accessLogger = format =>
  morgan(format, { stream: accessLogStream });

class MessageLogger {
  LOG_TYPES = {
    info: 'INFO',
    error: 'ERROR',
    warn: 'WARN',
    log: 'LOG',
    success: 'SUCCESS',
  };

  constructor() {}

  logToFile(type, message) {
    fs.promises.appendFile(
      path.join(__dirname, '..', 'message.log'),
      `${type}: ${message}\n`
    );
  }

  info(message) {
    const logType = this.LOG_TYPES.info;
    console.log(`${chalk.bgBlue(logType)} ${chalk.blue(message)}`);
    this.logToFile(logType, message);
  }

  error(message) {
    const logType = this.LOG_TYPES.error;
    console.log(`${chalk.bgRed(logType)} ${chalk.red(message)}`);
    this.logToFile(logType, message);
  }

  warn(message) {
    const logType = this.LOG_TYPES.warn;
    console.log(`${chalk.bgYellow(logType)} ${chalk.yellow(message)}`);
    this.logToFile(logType, message);
  }

  success(message) {
    const logType = this.LOG_TYPES.success;
    console.log(`${chalk.bgGreen(logType)} ${chalk.green(message)}`);
    this.logToFile(logType, message);
  }

  log(message) {
    const logType = this.LOG_TYPES.log;
    console.log(`${chalk.bgWhite(logType)} ${message}`);
    this.logToFile(logType, message);
  }
}

export const messageLogger = new MessageLogger();
