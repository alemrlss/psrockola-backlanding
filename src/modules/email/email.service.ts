// email/email.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
const configService = new ConfigService();

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: configService.get("EMAIL_HOST"),
      port: 465,
      secure: true,
      auth: {
        user: "equiporockola@psrockola.com",
        pass: configService.get("EMAIL_PASS"),
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
