import { Env } from "./envs/EnvConfig";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const CONSTANTS = isProd ? Env.prod : isDev ? Env.dev : Env.lan;

export default CONSTANTS;
