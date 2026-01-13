import { FETCH_DELAY_MS } from "@/util/consts";

export const sleep = (ms: number = FETCH_DELAY_MS): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};