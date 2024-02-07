import { z } from "zod";

export const permitFormSchema = z.object({
  location: z.string({ required_error: "Location is required." }),

  equipment: z
    .string()
    .min(2, {
      message: "Equipment must be at least 2 characters.",
    })
    .max(30, {
      message: "Equipment must not be longer than 30 characters.",
    }),
/*   startDate: z.date({
    required_error: "A date is required.",
  }),
  endDate: z.date({
    required_error: "A date is required.",
  }), */
  rams: z.string({ required_error: "Rams is required." }),

  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters.",
    })
    .max(300, {
      message: "Description must not be longer than 300 characters.",
    }),
  isolation: z.enum(["yes", "no"], {
    required_error: "Required.",
  }),
  sap: z.enum(["yes", "no"], {
    required_error: "Required.",
  }),
  workType: z.enum(["mechanical", "electrical"], {
    required_error: "Required.",
  }),
  workDuration: z.string(),
  otherInformation: z.string(),

/*   pointsOfIsolation: z.string(),
  primaryEarthingDevice: z.string(),
  actionsTaken: z.string(),
  furtherPrecautions: z.string(),
  variedPrecautions: z.string(), */
});