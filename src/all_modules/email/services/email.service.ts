// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmail } from 'src/all_modules/profile/schema/interface/profile.interface';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcome(user: IEmail, token: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;
  

    
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to ClockIn App!',
      template: 'email-template.ejs', 
      context: { 
        name: user.fullName,
        password: user.password,
        confirmation_url,
      },
    });
  }
}
