import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, FileText, Code } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">R</span>
            </div>
            <span className="text-lg font-semibold text-foreground">RWA NAV Coprocessor</span>
          </div>
          <Badge variant="network" className="hidden sm:flex">
            on Mantle Network
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="nav" size="sm" className="hidden sm:flex gap-2">
            <FileText className="h-4 w-4" />
            Docs
          </Button>
          <Button variant="nav" size="sm" className="hidden sm:flex gap-2">
            <Code className="h-4 w-4" />
            API
          </Button>
          <Button variant="glass" size="sm" className="gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
