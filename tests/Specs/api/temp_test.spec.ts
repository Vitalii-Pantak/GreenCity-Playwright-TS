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
import { text } from "stream/consumers";


const tags = [Tags.ADS, Tags.NEWS]



t("api handler test222222", async({ newsClient, commentsClient }) => {
  
    
    // const news = await newsClient.addNews({title: "hello", tags: tags, text: "woooooooooooooooooooooooooooooof"})
    // const newsId = news.id
    // const resp = await newsClient.deleteNewsById(newsId)
    // console.log(resp.status())
    // const news2 = await newsClient.getById(4044)
    // const t = await newsClient.getNewsTags()
    // console.log(t[1].id)
    // const id = news.id
    // await newsClient.updateNews(id, {title: "WOOF", content: "hiiiiiiiiiiiiiiiiiiiiiiiiiiiii", tags: tags, id: id})
   
    // const j = await resp.json()
    // console.log(resp)
    // const c = await commentsClient.dislikeComment(2627)
    // console.log(c)
    const com = await commentsClient.getAllActiveComments({ecoNewsId: 4044, page: 1, size: 1})
    // const com = await commentsClient.getAllActiveComments(4044, 1, 1)

    console.log(com)
    // const s = await newsClient.isRelevanceEnabled()
    // console.log(s)
});






