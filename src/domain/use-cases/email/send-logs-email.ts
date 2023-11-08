import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogsEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendLogsEmail implements SendLogsEmailUseCase {

  constructor(private readonly logRepository: LogRepository, private readonly emailService: EmailService) { }

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const result = await this.emailService.sendEmailWithFileSystemLogs(to);

      if(!result) {
        throw new Error('Error on send email');
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Logs email sent to ${to}`,
        origin: 'send-logs-email.ts'
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {

      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Error on send logs email: ${error}`,
        origin: 'send-logs-email.ts'
      });

      this.logRepository.saveLog(log);
      return false
    }
  }
}