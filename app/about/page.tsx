'use client';

import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './About.module.scss';

const About = () => {
  return (
    <Container className={styles.aboutContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" className={styles.title}>
          About Anokha Ghar
        </Typography>
        <Grid container spacing={4} className={styles.content}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" className={styles.description}>
              Welcome to Anokha Ghar, your premier destination for unique and handcrafted items. 
              We are passionate about bringing you the finest selection of home decor, fashion, 
              and lifestyle products that reflect the rich cultural heritage of India.
            </Typography>
            <Typography variant="body1" className={styles.description}>
              Our journey began with a simple mission: to provide our customers with authentic, 
              high-quality products that tell a story. Each item in our collection is carefully 
              curated and crafted by skilled artisans who take pride in their work.
            </Typography>
            <Typography variant="body1" className={styles.description}>
              At Anokha Ghar, we believe in sustainable practices and fair trade. We work 
              directly with artisans and small businesses to ensure that they receive fair 
              compensation for their craftsmanship while preserving traditional techniques.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={styles.imageContainer}>
              <Image
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2070&auto=format&fit=crop"
                alt="About Us"
                width={600}
                height={400}
                className={styles.aboutImage}
              />
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About; 