export interface DesktopHeaderProps {
  className?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onNotificationClick?: () => void;
  onThemeToggle?: () => void;
  avatarUrl?: string;
  headerLeft?: React.ReactNode;
}

export interface HeaderProps {
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  onThemeToggle?: () => void;
  headerLeft?: React.ReactNode;
}
