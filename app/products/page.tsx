'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Pagination, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import styles from './Products.module.scss';
import MainLayout from '../components/layout/MainLayout';
import { products } from '../data/products';

const categories = ['All', 'Clothing', 'Ornaments', 'Home Decor', 'Furnishing'];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const productsPerPage = 20;

  // Filter products by category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" className={styles.productsContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" className={styles.title}>
            Our Products
          </Typography>
          
          <Box className={styles.categoriesContainer}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryChange(category)}
                className={`${styles.categoryChip} ${
                  selectedCategory === category ? styles.selected : ''
                }`}
              />
            ))}
          </Box>

          <Box className={styles.productsGrid}>
            {currentProducts.map((product) => (
              <Box key={product.id} className={styles.productItem}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>

          <Box className={styles.paginationContainer}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              className={styles.pagination}
            />
          </Box>
        </motion.div>
      </Container>
    </MainLayout>
  );
};

export default Products; 