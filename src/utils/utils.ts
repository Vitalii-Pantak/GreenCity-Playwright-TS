import { Locator } from "@playwright/test";
import Ajv from "ajv";
import addFormats from "ajv-formats";

type QueryPrimitive = string | number | boolean;
type QueryInput = Record<string, QueryPrimitive | QueryPrimitive[] | undefined>;
export function paramBuilder(data: QueryInput): Record<string, QueryPrimitive> {
    const result: Record<string, QueryPrimitive> = {};

    for (const [key, value] of Object.entries(data)) {
        if (value === undefined) continue;

        if(Array.isArray(value)) {
            result[key] = value.join(",");
        } else {
            result[key] = value;
        }
    }
    return result;
};

export function getCurrentDate(): string {
    const date = new Date()
    const formattedDate = date.toLocaleDateString('en-US', {month: 'short',   day: 'numeric',  year: 'numeric'});
    return formattedDate;
};

export async function isWarningAttributeUp(locator: Locator): Promise<boolean> {
    const value = "warning";
    const status = await locator.getAttribute("class");
    const arr = status?.split(" ");
    if (arr !== undefined && arr.length > 1) {
        return arr.includes(value);
    }
    return false;
};

const ajv = new Ajv({allErrors: true});
addFormats(ajv);

export function validateSchema(schema: any, response: object) {
    const validate = ajv.compile(schema);
    const valid = validate(response)
    if (!valid) {
        throw new Error(
            `${schema.$id} Validation Failed\n\n` +
            `${JSON.stringify(validate.errors, null, 2)}\n\n` +
            `Response:\n\n` +
            `${JSON.stringify(response, null, 2)}`
        )
    }
}