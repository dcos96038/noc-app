import { CronJob } from 'cron'

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  constructor() {}

  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(cronTime,  onTick);

    job.start();

    return job;
  }
}