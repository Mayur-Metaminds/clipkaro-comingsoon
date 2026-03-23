import { cn } from "../../lib";
import { useDebounce } from "../../hooks";
import { GradientSearchInputProps } from "../../types/common/gradient-search";
import { Search, X } from "lucide-react";
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
  useMemo,
} from "react";

const GradientSearchInput: React.FC<GradientSearchInputProps> = memo(
  ({
    placeholder = "Search",
    value,
    onChange,
    onClick,
    onSearch,
    onClear,
    className = "",
    borderRadius = "12px",
    disabled = false,
    autoFocus = false,
    gradient = "linear-gradient(90deg, #6a3cff 0%, #b000ff 40%, #ff1aae 75%, #ff4fa3 100%)",
    bgColor = "#0f1117",
    iconClassName,
    debounceDelay,
  }) => {
    const [internalValue, setInternalValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Memoize control state check
    const isControlled = useMemo(() => value !== undefined, [value]);
    const displayValue = isControlled ? (value ?? "") : internalValue;

    // Apply debounce only if debounceDelay is provided (opt-in feature)
    const debounced = useDebounce(displayValue, debounceDelay || 0);
    const debouncedValue = debounceDelay ? debounced : displayValue;

    // Trigger onChange with debounced value when debounceDelay is enabled
    useEffect(() => {
      if (debounceDelay && debouncedValue !== displayValue) {
        onChange?.(debouncedValue);
      }
    }, [debouncedValue, debounceDelay, displayValue, onChange]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!isControlled) setInternalValue(newValue);
        // Call onChange immediately if no debounce, otherwise let effect handle it
        if (!debounceDelay) onChange?.(newValue);
      },
      [isControlled, debounceDelay, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onSearch?.(displayValue);
        else if (e.key === "Escape") {
          if (!isControlled) setInternalValue("");
          onClear?.();
          inputRef.current?.blur();
        }
      },
      [displayValue, isControlled, onSearch, onClear]
    );

    const handleClear = useCallback(() => {
      if (!isControlled) setInternalValue("");
      onChange?.("");
      onClear?.();
      inputRef.current?.focus();
    }, [isControlled, onChange, onClear]);

    return (
      <div
        className={cn(
          "gradient-border-final flex items-center gap-2.5 rounded-lg p-4 transition-all",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Search Icon */}
        <Search className={cn("h-4 w-4 text-gray-400", iconClassName)} />

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`typo-hint-text textcolor-color-bt dark:textcolor-text-secondary flex-1 border-none bg-transparent outline-none disabled:cursor-not-allowed`}
        />

        {/* Clear button — only shown when there's a value */}
        {displayValue && !disabled && (
          <X
            size={16}
            onClick={handleClear}
            className="textcolor-color-bt dark:textcolor-text-secondary shrink-0 cursor-pointer"
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom memoization: only re-render when these props change
    return (
      prevProps.value === nextProps.value &&
      prevProps.onChange === nextProps.onChange &&
      prevProps.onSearch === nextProps.onSearch &&
      prevProps.onClear === nextProps.onClear &&
      prevProps.placeholder === nextProps.placeholder &&
      prevProps.className === nextProps.className &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.debounceDelay === nextProps.debounceDelay &&
      prevProps.iconClassName === nextProps.iconClassName
    );
  }
);

GradientSearchInput.displayName = "GradientSearchInput";

export default GradientSearchInput;
