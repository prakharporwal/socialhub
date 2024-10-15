import { Env } from "./envs/EnvConfig";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const CONSTANTS = Env.prod;
export default CONSTANTS;
