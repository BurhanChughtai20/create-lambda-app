type PlainObject = Record<string, unknown>;

export const isPlainObj = (value: unknown): value is PlainObject => {
    return (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
    );
};

export const mergeDeep = <T extends PlainObject>(target: T, source: PlainObject): T => {
    const targetObj = target as PlainObject;

    for (const [key, value] of Object.entries(source)) {
        if (isPlainObj(value) && isPlainObj(targetObj[key])) {
            mergeDeep(targetObj[key] as T, value as T);
        }
        else {
            targetObj[key] = value;
        };
    };

    return target as T;

};