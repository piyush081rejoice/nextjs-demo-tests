import { Grid } from '@mui/material';
import ProductCard from './product-card';

import type { Product } from './product-card';

const ProductGrid = ({ products }: { products: Product[] }) => (
  <Grid container spacing={3}>
    {products.map((product) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
);

export default ProductGrid;