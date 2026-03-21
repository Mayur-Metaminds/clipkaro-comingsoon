import { z } from "zod";
// import { BaseService } from "@/lib/api/BaseService";
// import { apiService } from "@/lib/api";

// --- 1. The Zod Schema ---
export const SetupBrandSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name is too long"),
  country: z.string().min(1, "Please select a country of operation"),
});

// Automatically generate the TypeScript interface
export type SetupBrandPayload = z.infer<typeof SetupBrandSchema>;

// --- 2. The Service Class ---
// Assuming you have a BaseService, you can extend it just like your Campaign service
class BrandService {
  protected baseUrl = "/brand";
  protected schema = SetupBrandSchema;

  /**
   * Submit the Brand Setup details
   */
  async setupBrand(data: SetupBrandPayload) {
    // REAL IMPLEMENTATION (matching your apiService pattern):
    // return apiService.post(`${this.baseUrl}/setup`, this.schema, data);

    // MOCK IMPLEMENTATION (until your backend is ready):
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data });
      }, 1500);
    });
  }
}

// Export the singleton instance
export const brandService = new BrandService();