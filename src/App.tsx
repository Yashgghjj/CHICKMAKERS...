import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductModal from './components/ProductModal';
import InvoiceModal from './components/InvoiceModal';
import FloatingContactWidget from './components/FloatingContactWidget';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CalculatorPage from './pages/CalculatorPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import FAQPage from './pages/FAQPage';
import TrackOrderPage from './pages/TrackOrderPage';
import BookMeasurementPage from './pages/BookMeasurementPage';
import type { CartItem, Product, Order } from './types';
import { CART_STORAGE_KEY } from './types';
import { saveOrderToFirestore } from './lib/firestoreService';
import { saveOrdersToStorage, loadOrdersFromStorage } from './data/sampleOrders';

function AppContent() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const persistCart = useCallback((items: CartItem[]) => {
    setCart(items);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, []);

  function addToCart(item: CartItem) {
    persistCart([...cart, item]);
    setCartOpen(true);
  }

  function addStandardProduct(product: Product) {
    addToCart({
      id: `item-${Date.now()}`,
      type: 'standard-product',
      product,
      quantity: 1,
      unitPrice: product.pricePerSqFt * product.minSqFt,
      totalPrice: product.pricePerSqFt * product.minSqFt,
      dimensionsSummary: `Min ${product.minSqFt} sq.ft`,
    });
  }

  function handleBuyNow(item: CartItem) {
    persistCart([item]);
    setCheckoutOpen(true);
  }

  function handleCheckoutComplete(order: Order) {
    setLastOrder(order);
    persistCart([]);
    const orders = loadOrdersFromStorage();
    orders.unshift(order);
    saveOrdersToStorage(orders);
    saveOrderToFirestore(order).catch(() => {});
    setCheckoutOpen(false);
    navigate('/track');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onBookMeasurement={() => navigate('/book-measurement')}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProductsPage
                onSelectProduct={setSelectedProduct}
                onAddStandardProduct={addStandardProduct}
              />
            }
          />
          <Route
            path="/calculator"
            element={
              <CalculatorPage
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
              />
            }
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route
            path="/track"
            element={
              <TrackOrderPage
                initialOrder={lastOrder}
                onViewInvoice={setInvoiceOrder}
              />
            }
          />
          <Route path="/book-measurement" element={<BookMeasurementPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Call & WhatsApp Action Widget */}
      <FloatingContactWidget />

      {/* Overlays — available on every page */}
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={(id, qty) =>
          persistCart(cart.map((i) => (i.id === id ? { ...i, quantity: qty, totalPrice: i.unitPrice * qty } : i)))
        }
        onRemove={(id) => persistCart(cart.filter((i) => i.id !== id))}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={cart}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          addStandardProduct(p);
          setSelectedProduct(null);
        }}
        onCustomize={(p) => {
          setSelectedProduct(null);
          navigate(`/calculator?product=${p.id}`);
        }}
      />

      <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
