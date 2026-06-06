import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-primary/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-primary" />
          <span>Shining Star · Crafted with care, among the stars.</span>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
