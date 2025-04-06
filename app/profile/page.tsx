'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tabs, Tab, Grid, Card, CardContent, CardMedia, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout from '../components/layout/MainLayout';
import styles from './Profile.module.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Load wishlist and orders from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    const savedOrders = localStorage.getItem('orders');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" className={styles.profileContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" className={styles.title}>
            My Profile
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab icon={<FavoriteIcon />} label="Wishlist" />
              <Tab icon={<ShoppingBagIcon />} label="Order History" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              {wishlist.length === 0 ? (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    Your wishlist is empty
                  </Typography>
                </Grid>
              ) : (
                wishlist.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card className={styles.wishlistCard}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {item.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          ₹{item.price}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            component="a"
                            href={`/products/${item.id}`}
                          >
                            View Details
                          </Button>
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              {orders.length === 0 ? (
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    You haven't placed any orders yet
                  </Typography>
                </Grid>
              ) : (
                orders.map((order) => (
                  <Grid item xs={12} key={order.id}>
                    <Card className={styles.orderCard}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Order #{order.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Date: {new Date(order.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1">
                          Total: ₹{order.total}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status: {order.status}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </TabPanel>
        </motion.div>
      </Container>
    </MainLayout>
  );
};

export default Profile; 