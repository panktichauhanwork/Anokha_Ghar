'use client';

import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './HeroSection.module.scss';
import { ShoppingBag, ArrowRight, Star } from '@mui/icons-material';

const HeroSection = () => {
  const categories = [
    {
      name: 'Clothing',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2069&auto=format&fit=crop',
      link: '/products/clothing',
      description: 'Elegant traditional and contemporary wear'
    },
    {
      name: 'Ornaments',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop',
      link: '/products/ornaments',
      description: 'Handcrafted jewelry and accessories'
    },
    {
      name: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop',
      link: '/products/home-decor',
      description: 'Artistic pieces for your living space'
    },
    {
      name: 'Furnishing',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2070&auto=format&fit=crop',
      link: '/products/furnishing',
      description: 'Luxurious fabrics and furnishings'
    }
  ];

  return (
    <Box className={styles.hero}>
      <div className={styles.heroBackground} />
      <Container maxWidth="lg">
        <Box className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={styles.textContent}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography variant="h1" className={styles.title}>
                Discover Unique Handcrafted Treasures
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography variant="h4" className={styles.subtitle}>
                Where Tradition Meets Modern Luxury
              </Typography>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={styles.buttonContainer}
            >
              <Button
                variant="contained"
                size="large"
                className={styles.ctaButton}
                href="/products"
                startIcon={<ShoppingBag />}
                endIcon={<ArrowRight />}
              >
                Shop Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="/products"
                className={styles.secondaryButton}
                startIcon={<Star />}
              >
                Featured Items
              </Button>
            </motion.div>
          </motion.div>

          <Grid container spacing={4} className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Grid 
                key={category.name} 
                item 
                xs={12} 
                sm={6} 
                md={3}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={styles.categoryCard}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={300}
                      height={400}
                      className={styles.categoryImage}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                  <Box className={styles.categoryOverlay}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Typography variant="h6" className={styles.categoryTitle}>
                        {category.name}
                      </Typography>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Typography variant="body2" className={styles.categoryDescription}>
                        {category.description}
                      </Typography>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        className={styles.categoryButton}
                        endIcon={<ArrowRight />}
                      >
                        Explore
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection; 