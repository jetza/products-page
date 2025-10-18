import Link from "next/link";

export default function EmailFooter() {
  return (
    <div className="mt-12 lg:mt-24 pt-6 lg:pt-8 border-t border-gray-200">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
        <div className="space-y-2">
          <h3 className="text-xl lg:text-2xl font-medium text-gray-400">SofaSocietyCo.</h3>
          <p className="text-xs lg:text-sm text-gray-400">© 2024, Sofa Society</p>
        </div>
        <div className="flex gap-4 lg:gap-6 text-xs lg:text-sm text-gray-600">
          <Link href="#" className="hover:text-gray-900">Instagram</Link>
          <Link href="#" className="hover:text-gray-900">TikTok</Link>
          <Link href="#" className="hover:text-gray-900">Pinterest</Link>
          <Link href="#" className="hover:text-gray-900">Facebook</Link>
        </div>
      </div>
    </div>
  );
}
