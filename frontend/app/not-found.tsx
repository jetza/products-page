import Link from "next/link";
import { Button } from "@/components/ui/Buttons/Button";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { CONTENT } from "@/lib/constants/content";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveHeader />
      
      <main className="flex-1 bg-white">
        <div className="px-5 lg:px-[116px] py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div>
              <h1 className="text-h1 font-medium text-black">
                404
              </h1>
            </div>
            <div></div>
            <div>
              <h2 className="text-h3 font-medium text-black">
                {CONTENT.errors.notFound.title}
              </h2>
            </div>

            <div>
              <p className="text-big font-normal leading-normal mb-8">
                {CONTENT.errors.notFound.description}
              </p>
              <Link href="/">
                <Button variant="primary" size="lg">
                  {CONTENT.errors.notFound.button}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <ResponsiveFooter />
    </div>
  );
}
