'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Button, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './ProductCard.module.scss';
import { Product } from '../../data/products';
import ProductDetailsModal from './ProductDetailsModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if product is in wishlist
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlist = JSON.parse(savedWishlist);
      setIsLiked(wishlist.some((item: Product) => item.id === product.id));
    }

    // Check if product is in cart
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      setIsInCart(cart.some((item: Product) => item.id === product.id));
    }
  }, [product.id]);

  const handleLike = () => {
    if (!mounted) return;
    
    const savedWishlist = localStorage.getItem('wishlist');
    let wishlist: Product[] = [];

    if (savedWishlist) {
      wishlist = JSON.parse(savedWishlist);
    }

    if (isLiked) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      wishlist.push(product);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    if (!mounted) return;
    
    const savedCart = localStorage.getItem('cart');
    let cart: Product[] = [];

    if (savedCart) {
      cart = JSON.parse(savedCart);
    }

    if (!isInCart) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      setIsInCart(true);
      
      // Dispatch custom event for cart update
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  if (!mounted) {
    return (
      <Card className={styles.productCard}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className={styles.productImage}
            priority
          />
        </div>
        <CardContent className={styles.cardContent}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="div" className={styles.productName}>
              {product.name}
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" className={styles.price}>
            ₹{product.price}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={styles.productCard} onClick={() => setIsModalOpen(true)}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className={styles.productImage}
              priority
            />
          </div>
          <CardContent className={styles.cardContent}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h6" component="div" className={styles.productName}>
                {product.name}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className={styles.likeButton}
                aria-label="add to wishlist"
              >
                {isLiked ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
            <Typography variant="body1" color="text.secondary" className={styles.price}>
              ₹{product.price}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={isInCart}
              className={styles.addToCartButton}
            >
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <ProductDetailsModal
        product={product}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard; 