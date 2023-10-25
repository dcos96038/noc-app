import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron";

export class Server {
  static start(): void {
    console.log('Server started');


    CronService.createJob('*/5 * * * * *', () => {
      // new CheckService().execute('https://www.google.com');
      const checkService = new CheckService(() => console.log('Service is ok'), (error) => console.error(`${error}`));

      checkService.execute('http://localhost:3000');
    });
  }
}