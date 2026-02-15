import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve(__dirname, "..", ".env")});

const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL || "https://www.greencity.cx.ua/#/greenCity";
const HEADLESS = process.env.HEADLESS === undefined ? false : process.env.HEADLESS === "true";
const CI = process.env.CI ? +process.env.CI : 1;
const RETRY_FAILED_TESTS = process.env.RETRY_FAILED_TESTS ? +process.env.RETRY_FAILED_TESTS : 0;
const API_BASE_USER_URL = "https://greencity-user.greencity.cx.ua/ownSecurity";
const API_BASE_URL = "https://greencity.greencity.cx.ua";

export default {
    BASE_CLIENT_URL,
    HEADLESS,
    CI,
    RETRY_FAILED_TESTS,
    API_BASE_USER_URL,
    API_BASE_URL,
};

export const TIMEOUT = 5000;