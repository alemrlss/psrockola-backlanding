import * as crypto from "crypto";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
const configService = new ConfigService();

//Service to encrypt and decrypt data
@Injectable()
export class CryptoService {
  private readonly algorithm = "aes-256-cbc";
  private readonly key = configService.get("CRYPTO_KEY");
  private readonly iv = configService.get("CRYPTO_IV");

  encrypt(data: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      Buffer.from(this.iv)
    );
    let encrypted = cipher.update(data, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  decrypt(data: string): string {
    try {
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        Buffer.from(this.key),
        Buffer.from(this.iv)
      );
      let decrypted = decipher.update(data, "hex", "utf-8");
      decrypted += decipher.final("utf-8");
      return decrypted;
    } catch (error) {
      console.error("Error al desencriptar:", error.message);
      return "";
    }
  }
}
