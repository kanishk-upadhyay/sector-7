/**
 * Main Navigation Configuration
 * Defines the structure of the header menu.
 * Supports nested items for dropdown menus (mega-menu style).
 */
export const HEADER_LINKS = [
    {
        title: "Guns",
        href: "/category/guns",
        description: "Browse our complete inventory of firearms.",
        items: [
            {
                title: "Handguns",
                href: "/category/handguns",
                description: "Pistols, revolvers, and sidearms.",
            },
            {
                title: "Rifles",
                href: "/category/rifles",
                description: "AR-15s, AK-47s, and long-range platforms.",
            },
        ]
    },
    {
        title: "Ammo",
        href: "/category/ammo",
        description: "Ammunition for all calibers.",
    },
    {
        title: "Gear",
        href: "/category/gear",
        description: "Tactical equipment and protective gear.",
    },
    {
        title: "Accessories",
        href: "/category/accessories",
        description: "Essential additions for your loadout.",
    },
]
