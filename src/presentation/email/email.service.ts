import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'

interface Attachments {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });

  constructor () {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Server logs';
    const htmlBody = `
      <h3>Server Logs - NOC</h3>
      <p>Find attached the server logs</p>
    `

    const attachments: Attachments[] = [
      {
        filename: 'logs-all.log',
        path: 'logs/logs-all.log'
      },
      {
        filename: 'logs-high.log',
        path: 'logs/logs-high.log'
      },
      {
        filename: 'logs-medium.log',
        path: 'logs/logs-medium.log'
      }
    ]

    return await this.sendEmail({ to, subject, htmlBody, attachments })
  }

}