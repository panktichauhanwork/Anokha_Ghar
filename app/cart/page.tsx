'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, IconButton, Divider, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import styles from './Cart.module.scss';
import MainLayout from '../components/layout/MainLayout';
import { Product } from '../data/products';

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      // Initialize quantities
      const initialQuantities = items.reduce((acc: Record<string, number>, item: Product) => {
        acc[item.id] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, []);

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(1, (prev[productId] || 1) + change);
      return { ...prev, [productId]: newQuantity };
    });
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[productId];
      return newQuantities;
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (quantities[item.id] || 1));
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 0 ? 50 : 0;
    return subtotal + shipping;
  };

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <Container>
          <Box className={styles.emptyCart}>
            <ShoppingCartIcon className={styles.emptyCartIcon} />
            <Typography variant="h5" className={styles.emptyCartText}>
              Your cart is empty
            </Typography>
            <Link href="/products">
              <Button variant="contained" className={styles.continueShoppingButton}>
                Continue Shopping
              </Button>
            </Link>
          </Box>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Box className={styles.cartContainer}>
          <Typography variant="h4" className={styles.cartTitle}>
            Shopping Cart
          </Typography>

          <Box className={styles.cartContent}>
            <Box className={styles.cartItems}>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box className={styles.cartItem}>
                    <Box className={styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </Box>

                    <Box className={styles.itemDetails}>
                      <Typography variant="h6" className={styles.itemName}>
                        {item.name}
                      </Typography>
                      <Typography variant="body1" className={styles.itemPrice}>
                        ₹{item.price}
                      </Typography>
                    </Box>

                    <Box className={styles.quantityControls}>
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className={styles.quantityButton}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={quantities[item.id] || 1}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        className={styles.quantityInput}
                        disabled
                      />
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className={styles.quantityButton}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="h6" className={styles.itemTotal}>
                      ₹{(item.price * (quantities[item.id] || 1)).toFixed(2)}
                    </Typography>

                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
                      className={styles.removeButton}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Divider className={styles.itemDivider} />
                </motion.div>
              ))}
            </Box>

            <Box className={styles.orderSummary}>
              <Typography variant="h5" className={styles.summaryTitle}>
                Order Summary
              </Typography>

              <Box className={styles.summaryItem}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">₹{calculateSubtotal().toFixed(2)}</Typography>
              </Box>

              <Box className={styles.summaryItem}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">₹50.00</Typography>
              </Box>

              <Divider className={styles.summaryDivider} />

              <Box className={styles.summaryItem}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">₹{calculateTotal().toFixed(2)}</Typography>
              </Box>

              <Button
                variant="contained"
                className={styles.checkoutButton}
                fullWidth
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
} 