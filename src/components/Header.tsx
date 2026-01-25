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
import { Menu, X } from "lucide-react"
import { HEADER_LINKS } from "@/config/navigation"

import { useCart } from "@/context/CartContext"

export function Header() {
    const { itemCount } = useCart()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-neutral-950 text-neutral-50 border-neutral-800">
            <div className="container flex h-16 items-center px-4 md:px-6">
                <Link to="/" className="mr-6 flex items-center space-x-2">
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

                <div className="ml-auto flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" className="text-neutral-400 hover:text-neutral-100 hover:bg-transparent">
                            Login
                        </Button>
                        <Link to="/cart">
                            <Button className="bg-neutral-100 text-neutral-900 hover:bg-neutral-200">
                                Cart ({itemCount})
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-neutral-300 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
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
                        <Button variant="ghost" className="w-full justify-start text-neutral-400">Login</Button>
                        <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full bg-neutral-100 text-neutral-900">Cart ({itemCount})</Button>
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
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
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
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
