export interface GradientSearchInputProps {
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  borderRadius?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  gradient?: string;
  bgColor?: string;
  iconClassName?: string;
  debounceDelay?: number; // Optional: debounce delay in ms. If provided, onChange calls are debounced. If omitted, onChange is immediate (default behavior)
}
