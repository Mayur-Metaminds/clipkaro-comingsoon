import { SocialLink, AgencyDetails } from "./common";

export interface UserProfilePayload {
  profileImageUrl: string | null;
  fullName: string;
  handle: string;
  countryCode: string;
  mobileNumber: string;
  description: string;
  socialLinks: SocialLink[];
  isAgencyAssociated: boolean;
  agency: AgencyDetails | null;
  isDataSyncEnabled: boolean;
}
