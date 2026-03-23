import { z } from "zod";
import { BaseService } from "../../../lib/api/BaseService";
import { apiService } from "../../../lib/api";

// --- 1. Sub-Schemas (For complex nested data) ---
export const GuidelineSchema = z.object({
  id: z.string().optional(), // Useful if you map over them in the UI
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
});

// --- 2. The Master Multi-Step Schema ---
export const NewCampaignSchema = z.object({
  // Step 1: Campaign Basics
  title: z.string().min(3, "Title must be at least 3 characters"),
  thumbnail: z
    .any()
    .refine(
      (file) => file !== undefined && file !== null,
      "Thumbnail is required"
    ),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  description: z
    .string()
    .min(10, "Description is too short")
    .max(300, "Max 300 characters limit exceeded"),
  category: z.string().optional(),

  // Step 2: Content & Platform
  campaignType: z.string().min(1, "Please select a campaign type"),
  targetPlatforms: z.array(z.string()).min(1, "Select at least one platform"),
  sourceFootageUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  supportingDocsUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  // Step 3: Budget & Pay Rate
  // z.coerce.number() safely transforms string inputs from the form into actual numbers for your DB!
  payRate: z.coerce.number().min(1, "Pay rate must be greater than 0"),
  campaignBudget: z.coerce
    .number()
    .min(1, "Total budget must be greater than 0"),

  // Step 4: Guidelines
  hashtags: z.string().optional(),
  mentions: z.string().optional(),
  videoLength: z.string().min(1, "Please select a duration range"),
  guidelines: z
    .array(GuidelineSchema)
    .min(1, "At least one content guideline is required"),

  // Internal/Hidden fields (Set during Step 5 submission)
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

// Automatically generate the TypeScript interface from the Zod Schema
export type NewCampaignPayload = z.infer<typeof NewCampaignSchema>;

// --- 3. The Service Class ---
class NewCampaignService extends BaseService<NewCampaignPayload> {
  protected baseUrl = "/campaigns";
  protected schema = NewCampaignSchema;

  /**
   * Helper function to convert our JSON payload into multipart/form-data
   */
  private buildMultipartData(
    data: NewCampaignPayload,
    status: "DRAFT" | "PUBLISHED"
  ) {
    const formData = new FormData();
    formData.append("status", status);

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // If it's the raw image file, append it directly
      if (key === "thumbnail" && value instanceof File) {
        formData.append(key, value);
      }
      // Arrays and Objects (like guidelines or platforms) must be stringified
      // so the backend can parse them back into JSON
      else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      }
      // Standard strings and numbers
      else {
        formData.append(key, String(value));
      }
    });

    return formData;
  }

  /**
   * Submit Step 5 as a Draft
   */
  async saveDraft(data: NewCampaignPayload) {
    const formData = this.buildMultipartData(data, "DRAFT");
    return apiService.post(
      `${this.baseUrl}/draft`,
      this.getSingleSchema(),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }
  /**
   * Submit Step 5 to Publish Live
   */
  async publish(data: NewCampaignPayload) {
    const formData = this.buildMultipartData(data, "PUBLISHED");
    return apiService.post(
      `${this.baseUrl}/publish`,
      this.getSingleSchema(),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }
}

// Export the singleton instance
export const newCampaignService = new NewCampaignService();
