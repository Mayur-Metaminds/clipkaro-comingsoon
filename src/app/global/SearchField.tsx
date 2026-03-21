import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

export default function SearchField({
  value = "",
  onChange,
  placeholder = "Search",
  className,
  inputClassName,
  iconClassName,
  icon,
  onIconClick,
}: SearchFieldProps) {
  return (
    <div
      className={cn(
        "ml-5 flex w-full items-center gap-2.5 rounded-[12px] border-b pt-2.5 pr-2.5 pb-3",
        className
      )}
    >
      {icon ? (
        <span
          onClick={onIconClick}
          className={cn(onIconClick && "cursor-pointer")}
        >
          {icon}
        </span>
      ) : (
        <Search className={cn("h-5 w-5 text-gray-400", iconClassName)} />
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent text-sm text-gray-300 outline-none placeholder:text-gray-500",
          inputClassName
        )}
      />
    </div>
  );
}
