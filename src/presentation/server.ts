import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron";

const logRepository = new LogRepositoryImpl(new FileSystemDatasource())

export class Server {
  static start(): void {
    console.log('Server started');


    CronService.createJob('*/5 * * * * *', () => {
      const checkService = new CheckService(logRepository, undefined, undefined);

      checkService.execute('http://localhost:3000');
    });
  }
}