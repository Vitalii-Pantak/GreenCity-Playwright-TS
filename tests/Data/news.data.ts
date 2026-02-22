import { Tags } from "@/enums/Tags";
import { BASE_IMAGE_1, BASE_IMAGE_3 } from "./images.data";

export const NEWS_CREATION_DATA = {
    title: "Hello World",
    content: "Hello World".repeat(5),
    source: "https://www.helloworld.com.ua",
    image: BASE_IMAGE_1,
    tags: [Tags.ADS, Tags.EDUCATION, Tags.NEWS]
}



export const NEWS_CREATION_NONVALID_DATA = {
    title: "Hello World".repeat(30),
    content: "Hello",
    source: "Hello",
    image: BASE_IMAGE_3,
    tags: [Tags.INITIATIVES, Tags.EVENTS, Tags.NEWS]
}