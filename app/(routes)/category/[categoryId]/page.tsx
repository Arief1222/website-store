import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Banner from "@/components/banner";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";

type Params = { categoryId: string };

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { categoryId } = await params;

  const [products, category] = await Promise.all([
    getProducts({ categoryId }),
    getCategory(categoryId),
  ]);

  return (
    <div className="big-white">
      <Container>
        {/* Safety: kalau category/banner bisa null */}
        {category?.banner && <Banner data={category.banner} />}

        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
