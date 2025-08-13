export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { prisma } from "@/lib/db";

function price(cents: number) {
  return (cents / 100).toFixed(2) + " €";
}

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // infer the element type of the array
  type ProductItem = (typeof products)[number];

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Snazzy Wear Lite</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {products.map((p: ProductItem) => (
            <div key={p.id} className="border rounded-lg overflow-hidden">
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="h-40 bg-gray-100" />
              )}
              <div className="p-3">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-600">{price(p.priceCents)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
