import Link from "next/link";
import { FileText, Mail, Code2 } from "lucide-react";

export function FooterLinks() {
  return (
    <div className="absolute bottom-4 w-full text-center">
      <div className="flex justify-center gap-8">
        <Link
          href="/impressum"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
        >
          <FileText className="h-4 w-4" />
          Impressum
        </Link>
        <Link
          href="mailto:peermaute@gmail.com"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
        >
          <Mail className="h-4 w-4" />
          Support
        </Link>
        <Link
          href="https://github.com/peermaute/unimusik"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
        >
          <Code2 className="h-4 w-4" />
          Code
        </Link>
      </div>
    </div>
  );
}
