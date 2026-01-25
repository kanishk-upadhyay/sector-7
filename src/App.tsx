import { Header } from "@/components/Header"
import { HomePage } from "@/pages/HomePage"
import { ProductPage } from "@/pages/ProductPage"
import { CategoryPage } from "@/pages/CategoryPage"
import { CartPage } from "@/pages/CartPage"
import { Routes, Route, Navigate } from "react-router-dom"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "sonner"

function App() {
  return (
    <CartProvider>
      <div className="dark min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-neutral-800 selection:text-neutral-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="border-t border-neutral-800 py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
            <p className="text-center text-sm leading-loose text-neutral-400 md:text-left">
              Built by Sector 7 Logistics. Tactical Mockup v1.0.
            </p>
          </div>
        </footer>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </CartProvider>
  )
}

export default App
