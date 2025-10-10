import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Typography Demo */}
        <section className="mb-12">
          <h1 className="text-4xl font-semibold mb-4" style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-normal)' }}>
            Display 64px Regular
          </h1>
          <h2 className="text-3xl font-semibold mb-4" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-semibold)' }}>
            Large Heading 48px SemiBold
          </h2>
          <h3 className="text-2xl font-semibold mb-4" style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-semibold)' }}>
            Heading 1 - 40px SemiBold
          </h3>
          <h4 className="text-xl font-semibold mb-4" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
            Heading 2 - 32px SemiBold
          </h4>
          <h5 className="text-lg font-semibold mb-4" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>
            Heading 3 - 24px SemiBold
          </h5>
          <p className="text-base mb-4" style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}>
            Body 16px Regular - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="text-base font-semibold mb-4" style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
            Body 16px SemiBold - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="text-sm mb-8" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-normal)' }}>
            Small 14px Regular - Lorem ipsum dolor sit amet.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-gray-800 transition"
            style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
