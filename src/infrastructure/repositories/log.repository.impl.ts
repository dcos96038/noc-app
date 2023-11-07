import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor (private readonly LogDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.LogDatasource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.LogDatasource.getLogs(severityLevel);
  }
}