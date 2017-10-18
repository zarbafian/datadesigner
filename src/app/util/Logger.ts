import { Config } from './Config';
const DEBUG = 0;

export class Logger {

    private static instance: Logger;

    private logLevel;

    constructor(appender) {

        this.logLevel = Config.LOG_LEVEL;
    }

    static getLogger(): Logger {
        if(Logger.instance == null) {
            Logger.instance = new Logger(Config.LOGGER);
        }
        return Logger.instance;
    }

    print(msg: string, level: number) {
        if(level >= this.logLevel) {
            console.log(msg);
        }
    }

    debug(msg) {
        this.print(msg, DEBUG);
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

    parseString(level: string) {
        if(level === 'debug') {
            return DEBUG;
        }
        else {
            console.error('Log level"' + level + '" is not defined');
        }  
    }
    
}