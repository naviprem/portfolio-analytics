export class LoggerService {

  constructor(private clientName: string) {
  }

  private logLevels = ['info', 'debug', 'error', 'fatal'];

  info(message: string) {
    if (this.logLevels.includes('info')) {
      console.log(this.clientName, ':', message);
    }
  }

  debug(message: string) {
    if (this.logLevels.includes('debug')) {
      console.log(this.clientName, ':', message);
    }
  }

  error(message: string) {
    if (this.logLevels.includes('error')) {
      console.error(this.clientName, ':', message);
    }
  }

  fatal(message: string) {
    if (this.logLevels.includes('fatal')) {
      console.error(this.clientName, ':', message);
    }
  }
}
