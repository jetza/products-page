import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { ResponsiveFooter } from "@/components/layout/ResponsiveFooter";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Home() {
  return (
    <>
      <ResponsiveHeader />
      <main className="flex-1">
        <PageContainer className="py-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-h1 font-medium text-gray-800 mb-6">
              Welcome to Sofa Society Co.
            </h1>
            <p className="text-button-big text-gray-600">
              Discover our collection of premium furniture
            </p>
          </div>
        </PageContainer>
      </main>
      <ResponsiveFooter />
    </>
  );
}
