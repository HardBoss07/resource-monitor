const FETCH_DELAY_MS: number = 200;

export const sleep = (ms: number = FETCH_DELAY_MS): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};