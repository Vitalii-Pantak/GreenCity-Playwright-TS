import { test, expect } from "@/fixtures/fixtureAPI"
import { RequestHandler } from "@/api/temp/handler"
import env from "config/env";
import fs from "fs"
import { BASE_IMAGE_1 } from "@tests/Data/images/images.data";


test("api handler test", async({ request, ownSecurityClient }) => {
    await ownSecurityClient.signIn(env.USER_EMAIL, env.USER_PASSWORD, env.PROJECT_NAME)
    const token = ownSecurityClient.getAccessToken()
    const api = new RequestHandler(request)


    console.log(token)
    const response = await api
                            .url("https://greencity.greencity.cx.ua") // example
                            .path("/eco-news")
                            .headers({Authorization: token})
                            .multipart({image: {
                                                name: "hello",
                                                mimeType: "image/jpeg",
                                                buffer: fs.readFileSync(BASE_IMAGE_1)
                                            },
                                            addEcoNewsDtoRequest: JSON.stringify({title: "hello", tags: ["News", "Ads"], text: "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"})
                                        })
                            // .body({title: "hello", tags: ["News", "Ads"], text: "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"})            
                            .postRequest(201)
                            // .returnRequest(status) -> instead of method ->  refactor
    console.log(response)
    const newsId = response.id

    const getRequest = await api
                            .path("/eco-news/" + newsId)
                            .getRequest(200)
    console.log(getRequest)
                                
    const deleteRequest = await api                  
                            .path(`/eco-news/${newsId}`)
                            .deleteRequest(200)
});

