import Hero from "@/components/Hero";
import PriceRisersSection from "@/components/PriceRisersSection";
import PriceFallersSection from "@/components/PriceFallersSection";
import AllProductsSection from "@/components/AllProductsSection";

export const revalidate = 60;

async function getProducts() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch products on homepage:", err);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PriceRisersSection initialProducts={products} />
      <PriceFallersSection initialProducts={products} />
      <AllProductsSection initialProducts={products} />
    </div>
  );
}
