import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary/20">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been
          moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Properties
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
