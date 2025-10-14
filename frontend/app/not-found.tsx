import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {/* Row 1, Column 1 - 404 */}
          <div>
            <h1 className="text-h1 font-medium text-black">
              404
            </h1>
          </div>

          {/* Row 1, Column 2 - Empty */}
          <div></div>

          {/* Row 2, Column 1 - Page not found */}
          <div>
            <h2 className="text-h3 font-medium text-black">
              Page not found
            </h2>
          </div>

          {/* Row 2, Column 2 - Description text */}
          <div>
            <p className="text-big font-normal leading-normal mb-8">
              The page you are looking for doesn&apos;t exist or an error occurred. 
              Go back, or head over to our home page.
            </p>
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
