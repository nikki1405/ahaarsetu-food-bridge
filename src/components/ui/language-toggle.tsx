
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Language = "english" | "telugu";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>("english");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <Globe className="h-4 w-4 mr-2" />
          {language === "english" ? "English" : "తెలుగు"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => setLanguage("english")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("telugu")}>
          తెలుగు (Telugu)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
