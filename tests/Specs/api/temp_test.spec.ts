import { test, expect } from "@/fixtures/fixtureAPI"
import { RequestHandler } from "@/api/clientsMain/handler"
import env from "config/env";
import fs from "fs"
import { BASE_IMAGE_1, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { UserClient } from "@/api/clientsMain/UserClient";
import { NewsClient } from "@/api/clientsMain/NewsClient";
import { Tags } from "@/enums/Tags";
import { title } from "process";
import { request as req } from "@playwright/test";
import { test as t } from "@/fixtures/fixtureAPIMain"


const tags = [Tags.ADS, Tags.NEWS]



t("api handler test222222", async({ newsClient }) => {
  
    
    // const resp = await newsClient.deleteNewsById(5627)
    const news = await newsClient.addNews({title: "hello", tags: tags, text: "woooooooooooooooooooooooooooooof"})
    // const id = news.id
    // await newsClient.updateNews(id, {title: "WOOF", content: "hiiiiiiiiiiiiiiiiiiiiiiiiiiiii", tags: tags, id: id})
   
    // const j = await resp.json()
    // console.log(resp)
    // console.log(news)
});






