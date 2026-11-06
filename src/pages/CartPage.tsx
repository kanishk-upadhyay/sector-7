import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Trash2, Plus, Minus } from "lucide-react"
import { FALLBACK_PRODUCT_IMAGE } from "@/components/ProductCard"
import { toast } from "sonner"

export function CartPage() {
    const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart()

    const handleCheckout = () => {
        const orderId = `SEC7-${Math.floor(100000 + Math.random() * 900000)}`
        toast.success(`Requisition submitted successfully. Ref #${orderId}`)
        clearCart()
    }

    if (items.length === 0) {
        return (
            <div className="container py-20 px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold text-neutral-100">Requisition List Empty</h2>
                <p className="text-neutral-400 max-w-md">Your loadout is currently empty. Visit the armory to select your equipment.</p>
                <Link to="/">
                    <Button variant="outline" className="mt-4 border-neutral-700 bg-transparent text-neutral-100 hover:bg-neutral-800 hover:text-white">
                        Return to Armory
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <section className="container py-12 px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-100 mb-8">Requisition List</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-800 bg-white p-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        if (e.currentTarget.src !== FALLBACK_PRODUCT_IMAGE) {
                                            e.currentTarget.src = FALLBACK_PRODUCT_IMAGE
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                <div className="grid gap-1">
                                    <h3 className="font-semibold text-neutral-200">{item.name}</h3>
                                    <p className="text-sm text-neutral-500 uppercase">{item.category}</p>
                                    <p className="text-sm font-medium text-neutral-300">${item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center space-x-2 bg-neutral-950 rounded-md border border-neutral-800 p-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-sm hover:bg-neutral-800 text-neutral-400"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="text-xs font-mono w-4 text-center text-neutral-200">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-sm hover:bg-neutral-800 text-neutral-400"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-400 hover:bg-red-950/20 h-8 px-2"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" className="w-full border-neutral-800 bg-transparent text-neutral-300 hover:text-red-400 hover:border-red-900 hover:bg-red-950/10" onClick={clearCart}>
                        Clear List
                    </Button>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-6 sticky top-24">
                        <h3 className="font-semibold text-xl text-neutral-100">Summary</h3>

                        <div className="space-y-3 text-sm text-neutral-400">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-neutral-200">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-neutral-200">Calculated at checkout</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span className="text-neutral-200">Calculated at checkout</span>
                            </div>

                            <div className="border-t border-neutral-800 pt-3 flex justify-between font-semibold text-neutral-100 text-base">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button className="w-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 font-bold" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
