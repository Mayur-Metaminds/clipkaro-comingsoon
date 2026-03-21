import { z } from "zod";

/**
 * Example API schemas and types
 * Define your API response schemas here using Zod
 */

// User schema - matches backend response
export const UserSchema = z.object({
  id: z.string(), // UUID
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  image: z.string().url().nullable().optional(),
  avatar: z.string().url().nullable().optional(),
  isVerifiedEmail: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

// Example: Paginated response
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    data: z.array(dataSchema),
    meta: z.object({
      page: z.number(),
      pageSize: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
  });

// Example: API response wrapper
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
  });

// Example: Error response
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
    details: z.unknown().optional(),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
