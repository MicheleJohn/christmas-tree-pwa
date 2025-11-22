import { z } from 'zod'

export const createTreeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
  theme: z.enum(['classic', 'modern', 'winter']).default('classic'),
})

export const updateTreeSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  theme: z.enum(['classic', 'modern', 'winter']).optional(),
  decorations: z.array(z.any()).optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
  }).optional(),
})

export type CreateTreeInput = z.infer<typeof createTreeSchema>
export type UpdateTreeInput = z.infer<typeof updateTreeSchema>
