import { test, expect } from "@/fixtures/fixtureAPI"
import { RequestHandler } from "@/api/temp/handler"
import env from "config/env";
import fs from "fs"
import { BASE_IMAGE_1, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { UserClient } from "@/api/temp/testOwnClient";
import { NewsClient } from "@/api/temp/testNewsClient";
import { Tags } from "@/enums/Tags";
import { title } from "process";


const tags = [Tags.ADS, Tags.NEWS]

test("api handler test", async({ request, ownSecurityClient }) => {

    const client = new UserClient(request)
    const response = await client.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME)
    const token = client.getAccessToken()
    // const stt = await st.json()
    const upd = await client.updateAccessToken()

    // console.log(response.userId)
    // console.log(upd.accessToken)
    // console.log(st.hasPassword)


    const newsClient = new NewsClient(request)
    const tt = await newsClient.getById(4063)
    // const ttt = await newsClient.deleteNewsById(token, 4064)
    const a = await newsClient.getDislikeCount(4063)
    const aa = await newsClient.getLikesCount(4063)
    const aaa = await newsClient.getNewsSummary(4063)
    const aaaa = await newsClient.getPublishedNewsCount()
    const aaaaa = await newsClient.isRelevanceEnabled()
    // console.log({a,aa,aaa,aaaa,aaaaa})
    const news = await newsClient.addNews(token, {title: "hello", tags: tags, text: "woooooooooooooooooooooooooooooof"})
    // console.log(news)
    const newsID = news.id
    const update = await newsClient.updateNews(newsID, token, {id: newsID, title: "hello", tags: tags, content: "hhhhhhhhiiiiiiiiiiiiiiiiiiiiiiii"})
    const deletex = await newsClient.deleteNewsById(token, newsID)
    // console.log(deletex)
    const findby = await newsClient.findByRelevant({size: 5, tags: tags}, token)
    // const findby = await newsClient.findByPage(token, {title: "VERY GOOD", size: 1})
    console.log(findby)
    // const like = await newsClient.likeRemoveLike(4044 , token)
    // console.log(findby.page[0].tagsEn)



    // const tttt = await newsClient.deleteNewsById(token, 4075)


    // console.log(tt)
    // console.log(ttt)


});


test("api handler test222", async({ request, ownSecurityClient }) => {
    const client = new UserClient(request)
    const response = await client.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME)
    const token = client.getAccessToken()
    const newsClient = new NewsClient(request)

    // const like = await newsClient.likeRemoveLike(4044 , token)
    // const like = await newsClient.dislikeRemoveDislike(4044 , token)
    // const like = await newsClient.addToFavorites(4044 , token)
    // const like = await newsClient.removeFromFavorites(4044 , token)
    const rec = await newsClient.getRecommendedNews(4086)


    // console.log(await like.json())
    // console.log(rec)    
});


