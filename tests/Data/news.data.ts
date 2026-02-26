import { Tags } from "@/enums/Tags";
import { BASE_IMAGE_1, BASE_IMAGE_3, BASE_IMAGE_4 } from "./images/images.data";

export const BASE_NEWS_DATA = {
    title: "Hello World",
    content: "Hello World!".repeat(5),
    source: "https://www.helloworld.com.ua",
    image: BASE_IMAGE_1,
    tags: [Tags.ADS, Tags.EDUCATION, Tags.NEWS].sort()
};

export const NON_VALID_NEWS_DATA = {
    title: "Hello World!".repeat(30),
    content: "Hello",
    source: "Hello",
    image: BASE_IMAGE_4,
    tags: [Tags.INITIATIVES, Tags.EVENTS, Tags.NEWS].sort()
};

export const UPDATE_NEWS_DATA = {
    title: "New title",
    content: "Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii!",
    source: "https://www.hiiiiiiii.com.ua",
    image: BASE_IMAGE_3,
    tags: [Tags.NEWS]
};