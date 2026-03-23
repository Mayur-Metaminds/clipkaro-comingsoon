import { z } from "zod";
import { BaseService } from "../../../lib/api/BaseService";
// import { apiService } from "@/lib/api";

// --- 1. Schema Definition ---
// We use Zod to ensure the code is formatted correctly before even hitting the backend
export const ReferralSchema = z.object({
  code: z
    .string()
    .min(1, "Please enter a referral code.")
    .max(20, "Referral code is too long."),
  // Optional: Add a regex if your codes follow a specific pattern (e.g., alphanumeric only)
  // .regex(/^[A-Za-z0-9]+$/, "Code can only contain letters and numbers"),
});

export type ReferralPayload = z.infer<typeof ReferralSchema>;

// --- 2. The Service Class ---
class ReferralService extends BaseService<ReferralPayload> {
  // Update this to match your actual backend endpoint
  protected baseUrl = "/referrals";
  protected schema = ReferralSchema;

  /**
   * Validates and applies a referral code.
   * Throws an error if the code is invalid, expired, or doesn't exist.
   */
  async applyCode(data: ReferralPayload) {
    // 1. Validate payload against Zod schema
    const validatedData = this.schema.parse(data);

    return new Promise((resolve, reject) => {
      // Add a fake 1-second network delay so you can see the loading state/transitions
      setTimeout(() => {
        // If you type "9083" or "TEST", act like the backend said SUCCESS!
        if (validatedData.code === "9083" || validatedData.code === "TEST") {
          resolve({ status: 200, data: { message: "Valid code!" } });
        }
        // If you type anything else, act like the backend threw an ERROR!
        else {
          reject({
            response: {
              data: {
                message: "Mock Error: Try typing '9083' to see a success!",
              },
            },
          });
        }
      }, 1000); // 1000ms delay
    });

    // ==========================================
    // ✅ REAL API CALL (Uncomment when backend is ready)
    // ==========================================
    /*
    return apiService.post(
      `${this.baseUrl}/validate`,
      this.getSingleSchema(),
      validatedData
    );
    */
  }
}

// Export the singleton instance
export const referralService = new ReferralService();
