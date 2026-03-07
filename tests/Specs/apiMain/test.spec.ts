import { STATUS } from "@/enums/enums";
import { Tags } from "@/enums/Tags";
import { test, expect, test2 } from "@/fixtures/fixtureAPIAuth";
import { NON_VALID_USER } from "@tests/Data/users.data";
import { feature, step, severity, epic } from "allure-js-commons";
import env from "config/env";

const tagsx = [Tags.ADS, Tags.EDUCATION]


test.skip("Sign In with wrong project name", {tag: ["@negative", "@regression"]}, async ({ userClient, authRequest, newsClient, commentsClient }) => {    
    const res = await newsClient.addNews({title: "woof",
         text: "wooooooooooooooooooooooof",
          tags: tagsx,
           
           expectedStatus: STATUS.CREATED_201
           })
    const newsId = res.id
    console.log(newsId)
    const upd = await newsClient.updateNews({id: newsId, content: "olaaaaaaaaaaaaaaaaaaaaaaa", tags: tagsx, title: "WOOF", expectedStatus: 200})
    console.log(upd)
    

});

