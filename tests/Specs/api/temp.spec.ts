import { EcoNewsClient } from "@/api/clients/ecoNewsClient";
import { OwnSecurityClient } from "@/api/clients/ownSecurityClient";

import { Tags } from "@/enums/Tags";
import { test, expect } from "@/fixtures/fixtureAPI";
import { BASE_IMAGE_3, BASE_IMAGE_2 } from "@tests/Data/images/images.data";
import { BASE_NEWS_DATA } from "@tests/Data/news.data";
import env from "config/env";
import { title } from "process";



// test.beforeEach("Sign in", async({ ownSecurityClient }) => {
//     await ownSecurityClient.signIn(env.USER_EMAIL,
//                                    env.USER_PASSWORD,
//                                    env.PROJECT_NAME);
// });

// test("Add news , update news, delete news", async ({ request, ecoNewsClient, ownSecurityClient }) => {
//         const token = ownSecurityClient.getAccessToken()
//         // const news = await ecoNewsClient.addNews(token, {title: BASE_NEWS_DATA.title,
//         //                                               text: BASE_NEWS_DATA.content,                                                  
//         //                                               source: BASE_NEWS_DATA.source,   
//         //                                               tags: BASE_NEWS_DATA.tags},
//         //                                               BASE_NEWS_DATA.image);
//         // const newsJSON = await news.json()
//         // console.log(newsJSON)
//         // const res = await ecoNewsClient.likeRemoveLike(3424, token)
//         // console.log(res)
//         // await ecoNewsClient.addToFavorites(3424, token)
//         await ecoNewsClient.removeFromFavorites(3424, token)
//         const res = await ecoNewsClient.findByRelevant([Tags.ADS, Tags.EDUCATION])
//         const resJSON = await res.json()
//         console.log(resJSON)
//         const likes = await ecoNewsClient.getLikesCount(3424)
//         const likesJSON = await likes.json()
//         console.log(likesJSON)
// });



