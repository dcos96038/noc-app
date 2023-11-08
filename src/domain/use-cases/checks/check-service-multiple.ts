import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface CheckServiceMultipleUseCase {
  execute: (url: string) => Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceMultipleUseCase {
  
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if(!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} is working`,
        origin: 'check-service.ts'
      });

      this.logRepository.forEach(logRepository => logRepository.saveLog(log))
      this.successCallback?.();
      return true;
    } catch (error) {
      const errorMessage = `Error on check service ${url}: ${error}`;
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: 'check-service.ts'
      });
      this.logRepository.forEach(logRepository => logRepository.saveLog(log))

      this.errorCallback?.(errorMessage);
      return false;
    }
  }

}