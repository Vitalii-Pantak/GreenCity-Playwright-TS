import { APILogger } from "@/utils/logger";
import { test, expect, request } from "@playwright/test";
import env from "config/env";


test('123', async({request}) => {
    const logger = new APILogger
    // console.log(env.API_BASE_URL + "/eco-news/4044")
    const res = await request.get(env.API_BASE_URL + "/eco-news/4044")
    const res2 = logger.logRequest("POST", env.API_BASE_URL + "/eco-news/4044", {"hi":"hi"})
    const res3 = logger.logResponse(res.status())
    console.log(logger.getRecentLogs())
});