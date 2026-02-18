import { Tags } from "@/enums/Tags";
import { BASE_IMAGE_1, BASE_IMAGE_3 } from "./images.data";

export const NEWS_CREATION_DATA = {
    title: "WOOOOOOOOOF",
    content: "WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOF",
    source: "https://www.woofcity.com.ua",
    image: BASE_IMAGE_1,
    tags: [Tags.ADS, Tags.EDUCATION, Tags.NEWS]
}



export const NEWS_CREATION_NONVALID_DATA = {
    title: "WOOOOOOOOOF".repeat(30),
    content: "WOOOF",
    source: "WOOF",
    image: BASE_IMAGE_3,
    tags: [Tags.INITIATIVES, Tags.EVENTS, Tags.NEWS]
}