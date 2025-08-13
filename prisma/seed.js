/* eslint-disable @typescript-eslint/no-require-imports */
// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const toSlug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

async function main() {
  const products = [
    {
      title: "Classic White Tee",
      description: "Soft cotton T-shirt for everyday wear.",
      priceCents: 1999,
      imageUrl:
        "https://images.unsplash.com/photo-1520975922375-cdb6bc1c4f43?w=1200",
      stock: 25,
    },
    {
      title: "Denim Jacket",
      description: "Timeless medium-wash denim jacket.",
      priceCents: 6599,
      imageUrl:
        "https://images.unsplash.com/photo-1520975693410-001f6c9adf90?w=1200",
      stock: 12,
    },
    {
      title: "Running Sneakers",
      description: "Lightweight sneakers for daily runs.",
      priceCents: 7999,
      imageUrl:
        "https://images.unsplash.com/photo-1520975601239-6b1b3f6b5b8a?w=1200",
      stock: 18,
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: toSlug(p.title) },
      update: {},
      create: { ...p, slug: toSlug(p.title) },
    });
  }

  console.log("Seeded products.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
