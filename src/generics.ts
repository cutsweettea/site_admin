import { z } from 'zod';

export const passwordParam = z.string().min(1).max(256);

export const getPageParams = z.object({
    pwd: passwordParam
});
