export type SidebarItemType = {
  icon: string;
  label: string;
  link: string;
  key: string;
  iconClassName?: string | ((isActive: boolean) => string);
  iconFill?: (params: { isActive: boolean; theme: "light" | "dark" }) => string;
}[];
