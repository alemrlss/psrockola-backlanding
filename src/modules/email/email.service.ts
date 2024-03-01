// email/email.service.ts
import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "mail.psrockola.com",
      port: 465,
      secure: true,
      auth: {
        user: "equiporockola@psrockola.com",
        pass: "VF}I$m5lJDY]",
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: "equiporockola@psrockola.com",
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Correo electrónico enviado:", info.response);
      return info;
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      throw error;
    }
  }
}
