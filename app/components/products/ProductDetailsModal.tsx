'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  Rating,
  Divider,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './ProductDetailsModal.module.scss';
import { Product } from '../../data/products';

interface ProductDetailsModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  open,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (product) {
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
    }
  }, [product]);

  if (!product || !mounted) return null;

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

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
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      className={styles.modal}
    >
      <DialogContent className={styles.modalContent}>
        <IconButton
          className={styles.closeButton}
          onClick={onClose}
          size="large"
        >
          <CloseIcon />
        </IconButton>

        <Box className={styles.productContainer}>
          {/* Left Side - Product Images */}
          <Box className={styles.imageSection}>
            <motion.div
              className={styles.mainImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                width={600}
                height={600}
                className={styles.productImage}
                priority
              />
            </motion.div>
            
            <Box className={styles.thumbnailContainer}>
              {product.images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`${styles.thumbnail} ${
                    currentImageIndex === index ? styles.active : ''
                  }`}
                  onClick={() => handleImageClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className={styles.thumbnailImage}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>

          {/* Right Side - Product Details */}
          <Box className={styles.detailsSection}>
            <Typography variant="h4" className={styles.productName}>
              {product.name}
            </Typography>

            <Box className={styles.ratingContainer}>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography variant="body2" className={styles.reviews}>
                ({product.reviews} reviews)
              </Typography>
            </Box>

            <Typography variant="h5" className={styles.price}>
              ₹{product.price}
            </Typography>

            <Typography variant="body1" className={styles.description}>
              {product.description}
            </Typography>

            <Box className={styles.tagsContainer}>
              {product.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  className={styles.tag}
                  variant="outlined"
                />
              ))}
            </Box>

            <Divider className={styles.divider} />

            <Box className={styles.actionButtons}>
              <Button
                variant="contained"
                className={styles.addToCartButton}
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </Button>

              <IconButton
                className={styles.likeButton}
                onClick={handleLike}
                size="large"
              >
                {isLiked ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal; 