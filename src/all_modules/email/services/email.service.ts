// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmail } from 'src/all_modules/profile/schema/interface/profile.interface';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(user: IEmail, token: string, subject: string, emailTemplate: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;
  

    
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: subject,
      template: emailTemplate, 
      context: { 
        name: user.fullName,
        password: user.password,
        confirmation_url,
      },
    });
  }
}
