import { STATUS } from "@/enums/enums";
import { test, expect } from "@/fixtures/fixtureAPIAuth";
import { COMMENT_DATA } from "@tests/data/comments.data";
import { feature, step, severity, epic } from "allure-js-commons";
import { addCommentSchema, commentSchema } from "@/api/schemas/comments.schema";
import { validateSchema } from "@/utils/utils";
import env from "config/env";

test.beforeEach("Set test metadata", async() => {
    severity("normal");
    epic("Comments");
    feature("Add comments");
});

test("Create comment, update, delete", {tag: ["@positive", "@smoke", "@regression"]}, async ({ commentsClient }) => {

    const comment = await step("Add comment", async() => {
        return await commentsClient.addComment({newsId: COMMENT_DATA.newsId,
                                                text: COMMENT_DATA.message,
                                                imagePath: COMMENT_DATA.image,
                                                expectedStatus: STATUS.CREATED_201});              
    });

    await step("Verify created comment", async() => {
        expect(comment.author.id).toEqual(Number(env.USER_ID));
        expect(comment.author.name).toEqual(env.USER_NAME);
        expect(comment.text).toEqual(COMMENT_DATA.message);
        validateSchema(addCommentSchema, comment)
    });

    await step("Update comment", async() => {
        await commentsClient.updateComment({id: comment.id,
                                            text: COMMENT_DATA.messageUpdate,
                                            expectedStatus: STATUS.SUCCESSFUL_200});     

    });

    await step("Delete comment", async() => {
        await commentsClient.deleteComment({id: comment.id, 
                                            expectedStatus: STATUS.SUCCESSFUL_200});
    });
});

test("Like comment ", {tag: ["@positive", "@regression"]}, async ({ commentsClient }) => {

    const beforeLike = await step("Get comment and comment likes status", async() => {
        const comment = await commentsClient.getComment({id: COMMENT_DATA.commentId, 
                                                         expectedStatus: STATUS.SUCCESSFUL_200});  
        validateSchema(commentSchema, comment);
        return Boolean(comment.likes);      
    });

    const afterLike = await step("Like comment and get updated likes status", async() => {
        const comment = await commentsClient.likeCommentAndGetInstance({id: COMMENT_DATA.commentId,
                                                                        expectedStatus: STATUS.SUCCESSFUL_200});  
        validateSchema(commentSchema, comment);
        return Boolean(comment.likes);   
    });
    
    await step("Vefiry like comment status changes", async() => {
        expect(beforeLike).not.toEqual(afterLike);
    });
});




