import { Config } from './Config';

export class Logger {

    private static instance: Logger;

    private logger;

    constructor(appender) {

    }

    static getLogger(): Logger {
        if(Logger.instance == null) {
            Logger.instance = new Logger(Config.LOGGER);
        }
        return Logger.instance;
    }

    trace(msg) {
        //this.logger.trace(msg);
    }
    debug(msg) {
        //this.logger.debug(msg);
    }
    info(msg) {
        //this.logger.info(msg);
    }
    warn(msg) {
        //this.logger.warn(msg);
    }
    error(msg) {
        //this.logger.error(msg);
    }
    fatal(msg) {
        //this.logger.fatal(msg);
    }
    
}