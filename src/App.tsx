import { Header } from "@/components/Header"
import { HomePage } from "@/pages/HomePage"
import { ProductPage } from "@/pages/ProductPage"
import { CategoryPage } from "@/pages/CategoryPage"
import { CartPage } from "@/pages/CartPage"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "sonner"
import { useEffect } from "react"

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
        <footer className="border-t border-neutral-800 py-8 bg-neutral-950">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
                Sector 7 Logistics
              </span>
              <span className="hidden sm:inline text-neutral-700">|</span>
              <p className="text-xs text-neutral-400 font-mono">
                Advanced Tactical Requisition Architecture v1.0
              </p>
            </div>
            <p className="text-xs text-neutral-400 font-mono text-center md:text-right">
              © {new Date().getFullYear()} Kanishk Upadhyay. All rights reserved.
            </p>
          </div>
        </footer>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </CartProvider>
  )
}

export default App
