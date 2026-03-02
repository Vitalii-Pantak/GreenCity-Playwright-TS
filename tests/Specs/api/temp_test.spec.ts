import { test, expect } from "@/fixtures/fixtureAPI"
import { RequestHandler } from "@/api/temp/handler"
import env from "config/env";
import fs from "fs"
import { BASE_IMAGE_1, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { UserClient } from "@/api/temp/testOwnClient";
import { NewsClient } from "@/api/temp/testNewsClient";
import { Tags } from "@/enums/Tags";
import { title } from "process";


const tags = [Tags.ADS, Tags.EDUCATION]

test("api handler test", async({ request, ownSecurityClient }) => {

    const client = new UserClient(request)
    const response = await client.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME)
    const token = client.getAccessToken()
    // const stt = await st.json()
    const upd = await client.updateAccessToken()

    console.log(response.userId)
    console.log(upd.accessToken)
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
    console.log(news)
    const newsID = news.id
    const update = await newsClient.updateNews(newsID, token, {id: newsID, title: "hello", tags: tags, content: "hhhhhhhhiiiiiiiiiiiiiiiiiiiiiiii"})
    const deletex = await newsClient.deleteNewsById(token, newsID)
    console.log(deletex)
    // const findby = await newsClient.findByRelevant(tags, "Test", undefined, 0, 50)
    // console.log(findby)
    const like = await newsClient.likeRemoveLike(4044 , token)
    console.log(like)



    // const tttt = await newsClient.deleteNewsById(token, 4075)


    console.log(tt)
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



// test("api handler test2 CRUD", async({ request, ownSecurityClient }) => {
//     await ownSecurityClient.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME)
//     const token = ownSecurityClient.getAccessToken()
//     const api = new RequestHandler(request)


//     console.log(token)
//     const response = await api
//                             .url("https://greencity.greencity.cx.ua") // example
//                             .method("post")
//                             .path("/eco-news")
//                             .headers({Authorization: token})
//                             .multipart({image: {
//                                                 name: "hello",
//                                                 mimeType: "image/jpeg",
//                                                 buffer: fs.readFileSync(BASE_IMAGE_1)
//                                             },
//                                             addEcoNewsDtoRequest: JSON.stringify({title: "hello", tags: ["News", "Ads"], text: "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"})
//                                         })                    
//                             .getResponse(201)


//     const responseJSON = await response.json()
//     console.log(response)
//     const newsId = responseJSON.id

//     const getRequest = await api
//                             .path("/eco-news/" + newsId)
//                             .method("get")
//                             .getResponse(200)
//     console.log(getRequest)

//     const update = await api
//                             .path("/eco-news/" + newsId)
//                             .method("put")
//                             .headers({Authorization: token})
//                             .multipart({image: {                                                
//                                                 name: "hello",
//                                                 mimeType: "image/jpeg",
//                                                 buffer: fs.readFileSync(BASE_IMAGE_2)}, updateEcoNewsDto : JSON.stringify({title: "ola", id: newsId, tags: ["News", "Ads"], content: "wwwwwwwwwwwwwwwwwwwwwwwwwwww"})})
//                             .getResponse(200) 
                            
//     console.log(update)
//     const deleteRequest = await api                  
//                             .path(`/eco-news/${newsId}`)
//                             .method("delete")
//                             .headers({Authorization: token})
//                             .getResponse(200)
//     console.log(deleteRequest)
// });



    // async getResponse(statusCode: number): Promise<APIResponse> {
    //     const url = this.getUrl()
    //     const method = this.apiMethod
    //     const options: any = {
    //         headers: this.apiHeaders
    //     }

    //     if (this.bodyType === "json") {
    //         options.data = this.apiBody;
    //     } else if (this.bodyType === "multipart") {
    //         options.multipart = this.apiMultipart;
    //     }

    //     const response = await this.request[this.apiMethod!](url, options)
    //     expect(statusCode, `Status code should be ${statusCode}`).toEqual(response.status());

    //     this.cleanUpFields()

    //     // try {
    //     //     const responseJSON = await response.json();
    //     //     return responseJSON;

    //     // } catch {
    //     //     return JSON.stringify({})
    //     // }
    //     // if (method !== "delete") {
    //     // } 
    //     // const responseJSON = await response.json();
    //     return response;

    // }