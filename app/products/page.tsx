import ProductsClient from "./ProductsClient"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const initialCategory = params?.category || "all"

  return <ProductsClient initialCategory={initialCategory} />
}