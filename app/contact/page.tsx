'use client';

import React from 'react';
import { Container, Typography, Grid, TextField, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <Container className={styles.contactContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" className={styles.title}>
          Contact Us
        </Typography>
        <Grid container spacing={4} className={styles.content}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" className={styles.subtitle}>
              Get in Touch
            </Typography>
            <Typography variant="body1" className={styles.description}>
              Have questions about our products or services? We'd love to hear from you.
              Fill out the form and we'll get back to you as soon as possible.
            </Typography>
            <Box className={styles.contactInfo}>
              <Typography variant="body1">
                <strong>Email:</strong> info@anokhaghar.com
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> +91 1234567890
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> 123 Main Street, City, State 123456
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form" className={styles.contactForm}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                type="email"
              />
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                size="large"
                className={styles.submitButton}
              >
                Send Message
              </Button>
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Contact; 