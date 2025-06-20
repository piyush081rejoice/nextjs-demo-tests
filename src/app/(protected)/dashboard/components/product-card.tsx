import { Card, CardActionArea, CardContent, CardMedia, Chip, Rating, Stack, Typography } from '@mui/material';
import Image from 'next/image';

type ProductDimensions = {
  width: number;
  height: number;
  depth: number;
}

type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}

// Displays a single product card with image, details, and interactive elements
const ProductCard = ({ product }: { product: ProductType }) => (
  <Card
    sx={{
      maxWidth: 345,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3,
      boxShadow: 4,
      transition: 'box-shadow 0.2s, transform 0.15s',
      '&:hover': {
        boxShadow: 8,
        transform: 'translateY(-2px) scale(1.015)',
      },
      bgcolor: 'background.paper',
    }}
  >
    <CardActionArea sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <CardMedia
        component={Image}
        height="180"
        image={product.thumbnail || product.images?.[0] || '/placeholder.png'}
        alt={product.title}
        sx={{ objectFit: 'cover', minHeight: 180, background: '#f5f5f5' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Typography gutterBottom variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, fontSize: '1.05rem' }}>
            {product.title}
          </Typography>
          <Chip label={product.category} size="small" color="primary" sx={{ fontWeight: 500 }} />
        </Stack>
        <Typography variant="body2" color="text.secondary" mb={1} fontWeight={500}>
          {product.brand}
        </Typography>
        {/* Price display with discount calculation */}
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <Typography variant="body1" color="primary" fontWeight={700}>
            ${product.price}
          </Typography>
          {product.discountPercentage > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through', ml: 0.5 }}>
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </Typography>
          )}
          {product.discountPercentage > 0 && (
            <Chip label={`-${product.discountPercentage}%`} size="small" color="success" sx={{ ml: 1, fontWeight: 600 }} />
          )}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" mt={1} mb={1}>
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="caption" color="text.secondary" ml={0.5}>({product.rating})</Typography>
        </Stack>
        <Typography
          variant="caption"
          sx={{
            color: product.stock > 0 ? 'success.main' : 'error.main',
            fontWeight: 600,
            letterSpacing: 0.2,
            mb: 1,
            display: 'block',
          }}
        >
          {product.availabilityStatus}
        </Typography>
        {/* Display 3 tags at max*/}
        <Stack direction="row" spacing={1} mt={1}>
          {product.tags?.slice(0, 3).map((tag: string) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.8em' }} />
          ))}
        </Stack>
      </CardContent>
    </CardActionArea>
  </Card>
);


export default ProductCard;