import React from 'react'
import ProductGrid from './components/product-grid';
import { API_ROUTES } from '@/common/utils/constants/apis';

const DashbaordPage = async () => {
  const productsData = await fetch(API_ROUTES.BASE + API_ROUTES.PRODUCTS).then(async (res) => await res.json())

  return (
    <div style={{ padding: 24 }}>
    <ProductGrid products={productsData.products} />
  </div>
  )
}

export default DashbaordPage