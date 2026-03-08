import { Clock } from "lucide-react";

interface ReadingTimeProps {
  text: string;
  className?: string;
}

export default function ReadingTime({ text, className = "" }: ReadingTimeProps) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 230));
  
  return (
    <span className={`inline-flex items-center gap-1 text-muted-foreground ${className}`}>
      <Clock className="w-3 h-3" />
      <span>{minutes} min read</span>
    </span>
  );
}
