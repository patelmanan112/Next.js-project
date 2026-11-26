import {z} from 'zod'

export const productSchema = z.object({
    name: z.string("name should be string").min(5),
    price: z.number().positive(),
    description: z.string().min(3).optional(),
    rating : z.number().positive().max(5),
});

export  const createProductSchema = z.array(productSchema)