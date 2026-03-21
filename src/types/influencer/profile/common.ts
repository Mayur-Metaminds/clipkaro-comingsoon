export type SocialPlatform = "Instagram" | "YouTube";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  handle?: string;
}

export interface AgencyDetails {
  id: string;
  name: string;
  associatedSince: string;
  logoUrl?: string | null;
}

export interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
  className?: string;
}

export interface DeactivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
