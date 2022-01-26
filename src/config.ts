import * as dotenv from "dotenv";
dotenv.config({ path: '.env' });

export const SUCCESS = Number(process.env.SUCCESS)
export const CREATE = Number(process.env.CREATE)
export const NOT_FOUND = Number(process.env.NOT_FOUND)
export const BODY_OK = process.env.BODY_OK
export const NO_EXISTS_ACCOUNT = Number(process.env.NO_EXISTS_ACCOUNT)
export const API_PORT = Number(process.env.API_PORT)
