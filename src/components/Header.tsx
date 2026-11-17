import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart } from "lucide-react"
import { HEADER_LINKS } from "@/config/navigation"
import logoImg from "@/assets/logo.png"

import { useCart } from "@/context/CartContext"

export function Header() {
    const { itemCount } = useCart()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-neutral-950/95 backdrop-blur-md text-neutral-50 border-neutral-800">
            <div className="container flex h-16 items-center px-4 md:px-6">
                <Link to="/" className="mr-6 flex items-center space-x-2.5 group">
                    <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-700/80 flex items-center justify-center overflow-hidden p-0.5 group-hover:border-neutral-500 transition-colors">
                        <img src={logoImg} alt="Sector 7" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter uppercase text-neutral-100">
                        Sector<span className="text-neutral-500">7</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {HEADER_LINKS.map((link) => (
                                <NavigationMenuItem key={link.title}>
                                    {link.items ? (
                                        <>
                                            <NavigationMenuTrigger className="bg-transparent text-neutral-300 hover:bg-neutral-800 focus:bg-neutral-800 data-[active]:bg-neutral-800 data-[state=open]:bg-neutral-800">
                                                {link.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="bg-neutral-900 border-neutral-800">
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-neutral-900 border border-neutral-800 rounded-md">
                                                    {link.items.map((item) => (
                                                        <ListItem
                                                            key={item.title}
                                                            title={item.title}
                                                            href={item.href}
                                                        >
                                                            {item.description}
                                                        </ListItem>
                                                    ))}
                                                    <ListItem title={`All ${link.title}`} href={link.href}>
                                                        {link.description}
                                                    </ListItem>
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <Link to={link.href} className={cn(navigationMenuTriggerStyle(), "bg-transparent text-neutral-300 hover:bg-neutral-800 focus:bg-neutral-800 data-[active]:bg-neutral-800")}>
                                            {link.title}
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center space-x-2 md:space-x-4">
                    <div className="hidden md:flex items-center space-x-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-neutral-800 bg-neutral-900/60 text-xs font-mono text-neutral-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            SYS: READY
                        </div>
                        <Link to="/cart">
                            <Button className="bg-neutral-100 text-neutral-900 hover:bg-neutral-200 font-medium">
                                <ShoppingCart className="w-4 h-4 mr-1.5" />
                                Cart ({itemCount})
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Cart Action */}
                    <Link
                        to="/cart"
                        className="md:hidden relative p-2 text-neutral-300 hover:text-white rounded-md hover:bg-neutral-800 transition-colors"
                        aria-label="Requisition Cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-100 px-1 text-xs font-mono font-bold text-neutral-950">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-neutral-300 hover:text-white rounded-md hover:bg-neutral-800 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-neutral-950 border-b border-neutral-800 p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
                    {HEADER_LINKS.map(link => (
                        <div key={link.title} className="space-y-2">
                            {link.items ? (
                                <div className="space-y-2">
                                    <div className="font-semibold text-neutral-500 uppercase text-xs tracking-wider px-2">{link.title}</div>
                                    {link.items.map(item => (
                                        <Link
                                            key={item.title}
                                            to={item.href}
                                            className="block px-2 py-1 text-lg font-medium text-neutral-300 hover:text-white"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <Link
                                    to={link.href}
                                    className="block px-2 py-1 text-lg font-medium text-neutral-300 hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            )}
                        </div>
                    ))}
                    <div className="pt-4 border-t border-neutral-800 flex flex-col space-y-3">
                        <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full bg-neutral-100 text-neutral-900 font-medium justify-center">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                View Requisition ({itemCount})
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    to={href as string}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-neutral-50 focus:bg-neutral-800 focus:text-neutral-50 text-neutral-300",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none text-neutral-100">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
