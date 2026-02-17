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
}

export function getCurrentDate(): string {
    const date = new Date()
    const formattedDate = date.toLocaleDateString('en-US', {month: 'short',   day: 'numeric',  year: 'numeric'});
    return formattedDate;
}