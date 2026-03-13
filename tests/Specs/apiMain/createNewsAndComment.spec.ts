import { STATUS } from "@/enums/enums";
import { test, expect } from "@/fixtures/fixtureAPIAuth";
import { BASE_NEWS_DATA } from "@tests/Data/news.data";
import { COMMENT_DATA } from "@tests/Data/comments.data";
import { feature, step, severity, epic } from "allure-js-commons";
import { ecoNewsSchema } from "@/api/schemas/news.schema";
import { addCommentSchema, commentSchema } from "@/api/schemas/comments.schema";
import { validateSchema } from "@/utils/utils";
import env from "config/env";

test("Create news, add comment, cleanup",
        {tag: ["@positive", "@smoke", "@regression"]},
        async ({ newsClient, commentsClient }) => {

    severity("normal");
    epic("News");
    feature("Create news");

    const news = await step("Create news", async() => {
        return await newsClient.addNews({title: BASE_NEWS_DATA.title,
                                         text: BASE_NEWS_DATA.content,                                                  
                                         source: BASE_NEWS_DATA.source,   
                                         tags: BASE_NEWS_DATA.tags, 
                                         imagePath: BASE_NEWS_DATA.image,
                                         expectedStatus: STATUS.CREATED_201});
    });

    await step("Verify successfully created news", async() => {        
        expect(news.title).toEqual(BASE_NEWS_DATA.title);
        expect(news.content).toEqual(BASE_NEWS_DATA.content);
        expect(news.source).toEqual(BASE_NEWS_DATA.source);
        expect(news.tagsEn.sort()).toEqual(BASE_NEWS_DATA.tags);  
        validateSchema(ecoNewsSchema, news)
    });

    const comment = await step("Add comment", async() => {
        return await commentsClient.addComment({newsId: news.id,
                                                text: COMMENT_DATA.message,
                                                imagePath: COMMENT_DATA.image,
                                                expectedStatus: STATUS.CREATED_201});              
    });

    await step("Verify created comment", async() => {
        expect(comment.author.id).toEqual(Number(env.USER_ID));
        expect(comment.author.name).toEqual(env.USER_NAME);
        expect(comment.text).toEqual(COMMENT_DATA.message);

        const countComments = await commentsClient.getCommentsCount({id: news.id, expectedStatus: STATUS.SUCCESSFUL_200});
        expect(countComments).toEqual(1);
        validateSchema(addCommentSchema, comment)
    });

    await step("Delete Comment and verify it deleted", async() => {
        await commentsClient.deleteComment({id: comment.id, expectedStatus: STATUS.SUCCESSFUL_200});
        const deletedComment = await commentsClient.getComment({id: comment.id, expectedStatus: STATUS.SUCCESSFUL_200});
        validateSchema(commentSchema, deletedComment)
        expect(deletedComment.status).toEqual("DELETED");

        const countComments = await commentsClient.getCommentsCount({id: news.id, expectedStatus: STATUS.SUCCESSFUL_200});
        expect(countComments).toEqual(0);
    });

    await step("Delete news article and verify it deleted", async() => {
        await newsClient.deleteNewsById({id: news.id, expectedStatus: STATUS.SUCCESSFUL_200});
        await newsClient.getById({id: news.id, expectedStatus: STATUS.NOT_FOUND_404});
    });
});