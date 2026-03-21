export type SocialPlatform = "instagram" | "youtube";

export interface ConnectSocialCardData {
  platform: SocialPlatform;
  isConnected: boolean;
  username?: string;
}
