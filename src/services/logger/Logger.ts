import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

export default class Logger {
  static actionLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.label({ label: 'Actions Log' }),
      winston.format.timestamp(),
      winston.format.prettyPrint()
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        datePattern: 'HH_DD-MM-YYYY',
        filename: process.env.LOG_FILE_DIRECTORY + 'actions',
        handleExceptions: true,
        level: 'debug',
        maxFiles: '7d',
        extension: '.log'
      })
    ]
  })
  static errorLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.label({ label: 'Error Log' }),
      winston.format.timestamp(),
      winston.format.prettyPrint()
    ),
    transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
        datePattern: 'HH_DD-MM-YYYY',
        filename: process.env.LOG_FILE_DIRECTORY + 'errors',
        handleExceptions: true,
        level: 'debug',
        maxFiles: '7d',
        extension: '.log'
      })
    ]
  })

  static logAction(message: string, data: object) {
    return this.actionLogger.debug(message, data)
  }

  static logError(message: string, data: object) {
    return this.errorLogger.debug(message, data)
  }
}
