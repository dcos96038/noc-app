import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendLogsEmail } from "../domain/use-cases/email/send-logs-email";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(new PostgresLogDatasource())
// const logRepository = new LogRepositoryImpl(new MongoLogDatasource())
// const logRepository = new LogRepositoryImpl(new FileSystemDatasource())
const emailService = new EmailService();

export class Server {
  static start(): void {
    console.log('Server started');

    // new SendLogsEmail(logRepository, emailService).execute('diegocoscolla@gmail.com')

    CronService.createJob('*/5 * * * * *', () => {
      const checkService = new CheckService(logRepository, undefined, undefined);

      checkService.execute('http://localhost:3000');
    });
  }
}