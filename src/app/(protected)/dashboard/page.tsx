import { API_ROUTES } from '@/common/utils/constants/apis';
import ProductGrid from './components/product-grid';

const DashbaordPage: React.FC = async () => {
  // Fetches products data from a public API and returns it as a response
  const productsData = await fetch(API_ROUTES.BASE + API_ROUTES.PRODUCTS).then(async (res) => await res.json())

  return (
    <div style={{ padding: 24 }}>
    <ProductGrid products={productsData.products} />
  </div>
  )
}

export default DashbaordPage