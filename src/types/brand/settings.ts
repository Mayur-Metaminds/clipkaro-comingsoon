export interface TabItem {
  label: string;
  value: string;
}

export interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export interface LinkedDevice {
  device: string;
  location: string;
  lastActive: string;
  activity: string;
  onAction?: () => void;
}

export interface LinkedDevicesProps {
  title?: string;
  devices: LinkedDevice[];
  className?: string;
  onSavePreferences?: () => void;
}

export interface NotificationRow {
  label: string;
  email: boolean;
  sms: boolean;
}

export interface NotificationSection {
  title: string;
  rows: NotificationRow[];
}

export interface NotificationsProps {
  title?: string;
  sections: NotificationSection[];
  columns?: readonly [string, string, string];
  onSave?: () => void;
  onRowChange?: (
    sectionTitle: string,
    rowLabel: string,
    field: "email" | "sms",
    checked: boolean
  ) => void;
  className?: string;
}

export interface AccountFormValues {
  companyName: string;
  website: string;
  email: string;
  phone: string;
  gstVatId: string;
  businessAddress: string;
}

export interface AccountProfileFormProps {
  onSave?: (data: AccountFormValues) => void;
}
