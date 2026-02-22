import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve(__dirname, "..", ".env")});

const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL || "https://www.greencity.cx.ua/#/greenCity";
const HEADLESS = process.env.HEADLESS ? process.env.HEADLESS === "true" : true;
const CI = process.env.CI ? +process.env.CI : 1;
const RETRY_FAILED_TESTS = process.env.RETRY_FAILED_TESTS ? +process.env.RETRY_FAILED_TESTS : 0;
const API_BASE_USER_URL = process.env.API_BASE_USER_URL ? process.env.API_BASE_USER_URL :"https://greencity-user.greencity.cx.ua/ownSecurity";
const API_BASE_URL = process.env.API_BASE_URL ? process.env.API_BASE_URL : "https://greencity.greencity.cx.ua";
const USER_EMAIL = process.env.USER_EMAIL ? process.env.USER_EMAIL : "testtestovich611@gmail.com";
const USER_PASSWORD = process.env.USER_PASSWORD ? process.env.USER_PASSWORD : "!Testtestovich611!";
const USER_NAME = process.env.USER_NAME ? process.env.USER_NAME : "NameForTest611";
const USER_ID = process.env.USER_ID ? process.env.USER_ID : "149";
const USER_LOCATION = process.env.USER_LOCATION ? process.env.USER_LOCATION : "Kyiv, Ukraine";
const PROJECT_NAME = process.env.PROJECT_NAME ? process.env.PROJECT_NAME : "GREENCITY";
const TIMEOUT = 5000;

export default {
    BASE_CLIENT_URL,
    HEADLESS,
    CI,
    RETRY_FAILED_TESTS,
    API_BASE_USER_URL,
    API_BASE_URL,
    USER_EMAIL,
    USER_NAME,
    USER_ID,
    USER_LOCATION,
    USER_PASSWORD,
    PROJECT_NAME,
    TIMEOUT
};

