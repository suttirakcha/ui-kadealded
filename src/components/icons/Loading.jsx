import { cn } from "@/lib/utils";

function Loading({ className }) {
  return (
    <div className={cn("animate-spin h-10 w-10 border-6 rounded-full border-gray-500 border-t-transparent", className)}></div>
  );
}

export default Loading;
