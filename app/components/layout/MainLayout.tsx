'use client';

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText, Badge, useScrollTrigger, Slide } from '@mui/material';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import styles from './MainLayout.module.scss';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const MainLayout = ({ children }: Props) => {
  const [year, setYear] = useState<number>(2024);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItems, setCartItems] = useState<number>(0);
  const [wishlistItems, setWishlistItems] = useState<number>(0);
  const pathname = usePathname();

  // Function to update cart count
  const updateCartCount = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart).length);
    } else {
      setCartItems(0);
    }
  };

  // Function to update wishlist count
  const updateWishlistCount = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist).length);
    } else {
      setWishlistItems(0);
    }
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
    updateCartCount();
    updateWishlistCount();

    // Add event listeners for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
      if (e.key === 'wishlist') {
        updateWishlistCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Add custom event listener for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    // { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            href={item.path}
            className={pathname === item.path ? styles.activeNavItem : ''}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <ListItem component={Link} href="/cart" className={pathname === '/cart' ? styles.activeNavItem : ''}>
          <ListItemText primary="My Cart" />
        </ListItem>
        <ListItem component={Link} href="/profile" className={pathname === '/profile' ? styles.activeNavItem : ''}>
          <ListItemText primary="My Profile" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box className={styles.layout}>
      <HideOnScroll>
        <AppBar position="fixed" className={styles.appBar}>
          <Container maxWidth="lg">
            <Toolbar className={styles.toolbar}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={styles.menuButton}
              >
                <MenuIcon />
              </IconButton>
              
              <Typography variant="h6" component="div" className={styles.logoContainer}>
                <Link href="/" className={styles.logo}>
                  Anokha Ghar
                </Link>
              </Typography>

              <Box className={styles.navLinks}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    component={Link}
                    href={item.path}
                    className={`${styles.navButton} ${pathname === item.path ? styles.active : ''}`}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>

              <Box className={styles.actions}>
                <IconButton className={styles.searchButton}>
                  <SearchIcon />
                </IconButton>
                <IconButton 
                  component={Link} 
                  href="/cart" 
                  className={styles.cartButton}
                >
                  <Badge badgeContent={cartItems} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton 
                  component={Link} 
                  href="/profile"
                  className={styles.profileButton}
                >
                  <PersonIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          className={styles.drawer}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box className={styles.toolbarSpacer} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.mainContent}
      >
        {children}
      </motion.main>

      <footer className={styles.footer}>
        <Container maxWidth="lg">
          <Box className={styles.footerContent}>
            <Box className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                Anokha Ghar
              </Typography>
              <Typography variant="body2" className={styles.footerText}>
                Your one-stop destination for unique and authentic products.
              </Typography>
            </Box>
            <Box className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                Quick Links
              </Typography>
              <Box className={styles.footerLinks}>
                {navItems.map((item) => (
                  <Link key={item.name} href={item.path} className={styles.footerLink}>
                    {item.name}
                  </Link>
                ))}
              </Box>
            </Box>
            <Box className={styles.footerSection}>
              <Typography variant="h6" className={styles.footerTitle}>
                Contact Us
              </Typography>
              <Typography variant="body2" className={styles.footerText}>
                Email: info@anokhaghar.com
              </Typography>
              <Typography variant="body2" className={styles.footerText}>
                Phone: +91 1234567890
              </Typography>
            </Box>
          </Box>
          <Box className={styles.footerBottom}>
            <Typography variant="body2" className={styles.copyright}>
              © {year} Anokha Ghar. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </footer>
    </Box>
  );
};

export default MainLayout; 