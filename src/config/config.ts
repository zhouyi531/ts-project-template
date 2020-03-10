import dotenv from "dotenv";
dotenv.config();

export class Config {
  public static serverPort: string = process.env.PORT || "3000";
}
