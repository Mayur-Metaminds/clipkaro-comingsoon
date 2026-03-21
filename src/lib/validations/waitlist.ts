import { z } from "zod";

export const WaitlistSchema = z.object({
  userRole: z.enum(["clipper", "creator"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNo: z.string().min(10, "Phone number must be at least 10 digits"),
  instagramId: z.string().optional().or(z.literal("")),
});

export type WaitlistInput = z.infer<typeof WaitlistSchema>;
