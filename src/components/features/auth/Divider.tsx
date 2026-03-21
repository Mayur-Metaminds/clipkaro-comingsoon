/**
 * Enhanced Divider component for separating auth methods
 */
export function Divider({ text = "OR" }: { text?: string }) {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-gray-200 dark:border-gray-800" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-4 font-semibold text-gray-500 dark:bg-gray-900 dark:text-gray-400">
          {text}
        </span>
      </div>
    </div>
  );
}
