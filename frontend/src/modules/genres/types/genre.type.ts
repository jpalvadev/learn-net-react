import * as z from 'zod';

export const genreSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
});

export type Genre = z.infer<typeof genreSchema>;

export const PROJECT_STATUSES = ['draft', 'active', 'finished'] as const;

export const projectSchema = z.object({
    name: z.string().min(1),
    status: z.enum(PROJECT_STATUSES),
    description: z
        .string()
        // .optional()
        .transform((v) => v || undefined),
    notifications: z.object({
        email: z.boolean(),
        sms: z.boolean(),
        push: z.boolean(),
    }),
    users: z
        .array(z.object({ email: z.email() }))
        .min(1)
        .max(5),
});

export type Project = z.infer<typeof projectSchema>;
