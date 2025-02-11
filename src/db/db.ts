import mysql from "mysql2/promise";
import { PoolOptions } from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";
dotenv.config();

const access: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const conn = mysql.createPool(access);

const db = drizzle({ client: conn });

export { conn, db };
