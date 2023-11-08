export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, createdAt = new Date(), origin } = options;

    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson(json: string): LogEntity {
    const { level, message, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({ level, message, createdAt, origin });

    return log;
  }
}