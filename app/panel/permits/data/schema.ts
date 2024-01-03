import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const permitSchema = z.object({
  id: z.string(),
  location: z.string(),
  status: z.string(),
  label: z.string(),

})

export type Task = z.infer<typeof permitSchema>
