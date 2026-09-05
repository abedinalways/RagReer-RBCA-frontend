export const sanitizeOtp = (
    value: string,
    length: number,
): string => {
    return value
        .replace(/\D/g, "")
        .slice(0, length);
};

export const createOtpValues = (
    value: string,
    length: number,
): string[] => {
    return Array.from(
        { length },
        (_, index) => value[index] ?? "",
    );
};

export const updateOtpValue = (
    values: string[],
    index: number,
    digit: string,
): string => {
    const updatedValues = [...values];

    updatedValues[index] = digit;

    return updatedValues.join("");
};

export const clearOtpValue = (
    values: string[],
    index: number,
): string => {
    const updatedValues = [...values];

    updatedValues[index] = "";

    return updatedValues.join("");
};