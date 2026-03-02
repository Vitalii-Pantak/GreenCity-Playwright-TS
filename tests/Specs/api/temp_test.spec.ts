import { test, expect } from "@/fixtures/fixtureAPI"
import { RequestHandler } from "@/api/temp/handler"
import env from "config/env";
import fs from "fs"
import { BASE_IMAGE_1, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { UserClient } from "@/api/temp/testOwnClient";


test("api handler test", async({ request, ownSecurityClient }) => {
    const handler = new RequestHandler(request)
    const client = new UserClient(handler)
    const response = await client.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME)
    const st = await client.getPasswordStatus()
    // const stt = await st.json()
    const upd = await client.updateAccessToken()

    // console.log(response.userId)
    // console.log(upd.accessToken)
    console.log(st.hasPassword)

});



test("api handler test2 CRUD", async({ request, ownSecurityClient }) => {
    await ownSecurityClient.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME)
    const token = ownSecurityClient.getAccessToken()
    const api = new RequestHandler(request)


    console.log(token)
    const response = await api
                            .url("https://greencity.greencity.cx.ua") // example
                            .method("post")
                            .path("/eco-news")
                            .headers({Authorization: token})
                            .multipart({image: {
                                                name: "hello",
                                                mimeType: "image/jpeg",
                                                buffer: fs.readFileSync(BASE_IMAGE_1)
                                            },
                                            addEcoNewsDtoRequest: JSON.stringify({title: "hello", tags: ["News", "Ads"], text: "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"})
                                        })                    
                            .getResponse(201)


    const responseJSON = await response.json()
    console.log(response)
    const newsId = responseJSON.id

    const getRequest = await api
                            .path("/eco-news/" + newsId)
                            .method("get")
                            .getResponse(200)
    console.log(getRequest)

    const update = await api
                            .path("/eco-news/" + newsId)
                            .method("put")
                            .headers({Authorization: token})
                            .multipart({image: {                                                
                                                name: "hello",
                                                mimeType: "image/jpeg",
                                                buffer: fs.readFileSync(BASE_IMAGE_2)}, updateEcoNewsDto : JSON.stringify({title: "ola", id: newsId, tags: ["News", "Ads"], content: "wwwwwwwwwwwwwwwwwwwwwwwwwwww"})})
                            .getResponse(200) 
                            
    console.log(update)
    const deleteRequest = await api                  
                            .path(`/eco-news/${newsId}`)
                            .method("delete")
                            .headers({Authorization: token})
                            .getResponse(200)
    console.log(deleteRequest)
});



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