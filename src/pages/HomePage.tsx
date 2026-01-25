import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/ProductGrid"
import { Link } from "react-router-dom"

export function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-neutral-900">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                    {/* Abstract tactical background pattern could go here */}
                    <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950" />
                </div>

                <div className="relative z-10 container px-4 md:px-6 text-center space-y-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white uppercase">
                        Mission Ready <span className="text-neutral-500">Gear</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-neutral-400 text-lg md:text-xl leading-relaxed">
                        Professional grade equipment for modern operators. Tested in the field, trusted by the best.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/category/guns">
                            <Button size="lg" className="bg-neutral-100 text-neutral-900 hover:bg-neutral-200 font-semibold px-8">
                                Shop Collection
                            </Button>
                        </Link>
                        <Link to="/category/gear">
                            <Button size="lg" variant="outline" className="text-neutral-100 border-neutral-700 bg-transparent hover:bg-neutral-800 hover:text-white">
                                View Loadouts
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="flex-1 bg-neutral-950">
                <ProductGrid />
            </div>
        </div>
    )
}
