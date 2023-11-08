import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from '@prisma/client';

const prisma = new PrismaClient();

const severityLevelEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await prisma.logModel.create({
      data: {
        level: severityLevelEnum[log.level],
        message: log.message,
        origin: log.origin,
        createdAt: log.createdAt
      }
    })

    console.log('Log created: ', newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: {
        level: severityLevelEnum[severityLevel]
      }
    })

    return logs.map(postgresLog => LogEntity.fromObject(postgresLog));
  }

}