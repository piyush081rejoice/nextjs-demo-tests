import { Grid } from '@mui/material';

import ProductCard, { type ProductType } from './product-card';

// Component that displays a responsive grid of product cards
const ProductGrid = ({ products }: { products: ProductType[] }) => (
  <Grid container spacing={3}>
    {products.map((product) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
);

export default ProductGrid;