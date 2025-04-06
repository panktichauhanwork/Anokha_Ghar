'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/app/data/products';
import styles from './SearchModal.module.scss';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(products);
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(products);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tags.some((tag: string) => tag.toLowerCase().includes(query))
    );
    setSearchResults(results);

    // Get suggestions based on product names
    const nameSuggestions = products.filter(product => 
      product.name.toLowerCase().includes(query)
    ).slice(0, 5);
    setSuggestions(nameSuggestions);
    setShowSuggestions(true);
  }, [searchQuery]);

  const handleSuggestionClick = (productId: string) => {
    setShowSuggestions(false);
    onClose();
    // Navigate to the product page
    window.location.href = `/products/${productId}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className={styles.searchModal}
      TransitionProps={{ onEntered: () => searchInputRef.current?.focus() }}
    >
      <DialogContent className={styles.dialogContent}>
        <Box className={styles.searchContainer}>
          <form onSubmit={handleSearchSubmit}>
            <TextField
              fullWidth
              autoFocus
              inputRef={searchInputRef}
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={styles.searchIcon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onClose}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <Paper className={styles.suggestionsContainer}>
              <List>
                {suggestions.map((product) => (
                  <React.Fragment key={product.id}>
                    <ListItem
                      component="div"
                      onClick={() => handleSuggestionClick(product.id)}
                      className={styles.suggestionItem}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className={styles.suggestionImage}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.name}
                        secondary={`₹${product.price.toLocaleString()}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}

          <Box className={styles.resultsContainer}>
            <Typography variant="h6" className={styles.resultsTitle}>
              {searchResults.length} Results Found
            </Typography>

            <Grid container spacing={2} className={styles.resultsGrid}>
              <AnimatePresence>
                {searchResults.map((product) => (
                  <Grid key={product.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' } }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link href={`/products/${product.id}`} onClick={onClose}>
                        <Paper className={styles.productCard}>
                          <Box className={styles.imageContainer}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={200}
                              height={200}
                              className={styles.productImage}
                            />
                          </Box>
                          <Box className={styles.productInfo}>
                            <Typography variant="subtitle1" className={styles.productName}>
                              {product.name}
                            </Typography>
                            <Typography variant="body2" className={styles.productPrice}>
                              ₹{product.price.toLocaleString()}
                            </Typography>
                            <Box className={styles.tagsContainer}>
                              {product.tags.slice(0, 3).map((tag: string) => (
                                <Typography
                                  key={tag}
                                  variant="caption"
                                  className={styles.tag}
                                >
                                  {tag}
                                </Typography>
                              ))}
                            </Box>
                          </Box>
                        </Paper>
                      </Link>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal; 