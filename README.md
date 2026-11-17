# Sector 7 Logistics
## Advanced Tactical Requisitions & Defense Procurement Architecture

<div align="center">
  <img src="public/logo.png" alt="Sector 7 Logistics Logo" width="130" />
  <br />
  <h3><i>"Equipping the Elite. Defining the Standard."</i></h3>
  <p>Mil-spec tactical e-commerce platform engineered with React 19, TypeScript, Tailwind CSS v4, and Vite.</p>
  
  <p>
    <a href="https://github.com/kanishk-upadhyay/sector-7/actions">
      <img src="https://img.shields.io/badge/Deployment-Operational-emerald?style=for-the-badge&logo=github-actions&logoColor=white" alt="Deployment Status" />
    </a>
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite" alt="Vite 7" />
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS v4" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License" />
    </a>
  </p>

  <p>
    <b>Live Deployments:</b>
    <a href="https://kanishk-upadhyay.github.io/sector-7/"><b>GitHub Pages Production Mirror</b></a> •
    <a href="https://kanishk-sector7.surge.sh/"><b>Surge Standby Edge</b></a>
  </p>
</div>

---

## 🖥️ Visual Interface Overview

### Desktop Command Center (1440 × 900)
![Sector 7 Desktop Command Center](assets/preview-sector7-desktop.png)

### Tactical Innovations & Advanced Logistics
| Multi-Faceted Armory Filter Drawer | Technical Blueprint HUD Mode |
| :---: | :---: |
| ![Multi-Faceted Armory Filter Drawer](assets/preview-sector7-filters.png) | ![Technical Blueprint HUD Mode](assets/preview-sector7-blueprint.png) |

| Tactical Loadout Weight & Caliber Gauge | Printable Requisition Manifest Modal |
| :---: | :---: |
| ![Loadout Weight & Caliber Gauge](assets/preview-sector7-weightgauge.png) | ![Official Requisition Manifest Modal](assets/preview-sector7-manifest.png) |

### Requisition Workflow & Spec Views
| Interactive Category Filter | Requisition Heads-Up Feedback |
| :---: | :---: |
| ![Interactive Category Filter](assets/preview-sector7-filtered.png) | ![Sonner Toast Notification](assets/preview-sector7-toast.png) |

---

## 📱 Mobile Field Terminal Emulation (Pixel 7 / iPhone 14 Pro: 393 × 852)

| Mobile Armory Feed | Touch Navigation Drawer | Mobile Cart Manifest |
| :---: | :---: | :---: |
| <img src="assets/preview-sector7-mobile-home.png" width="280" alt="Mobile Armory Feed" /> | <img src="assets/preview-sector7-mobile-menu.png" width="280" alt="Mobile Navigation Drawer" /> | <img src="assets/preview-sector7-mobile-cart.png" width="280" alt="Mobile Cart Manifest" /> |

---

## 🛡️ Mission Brief

**Sector 7 Logistics** is a next-generation tactical e-commerce platform designed for defense contractors, specialized law enforcement, and field operators requiring high-grade requisitions.

Built with a "function-over-form" philosophy that yields a brutalist, tactile aesthetic, Sector 7 unifies mil-spec visual design with modern web performance: zero layout shifts, instantaneous client-side filtering, touch-optimized stepper controls, and clean SPA deep-linking on GitHub Pages.

---

## ⚡ Core Architectural Capabilities

### 1. The Armory (Dynamic Real-Time Catalog)
* **Instant Filter Pills**: Filter across Handguns, Rifles, Ammunition, Gear, and Accessories with zero latency and automatic unit count telemetry.
* **Persistent Breadcrumb Navigation**: Seamless hierarchical navigation (`Armory / Category / Unit`) across all product and category views.
* **Infinite Telemetry Marquee**: 35-second looping tactical telemetry ticker with edge gradient masks and auto-pause on user hover.

### 2. Tactical Requisition Management
* **Persistent Local Cache**: Requisition loadouts are synchronized to `localStorage` (`cart-storage`), persisting through browser reloads and connection drops.
* **Non-Intrusive Heads-Up Feedback**: Instant notifications via `Sonner` confirm inventory operations with reference order IDs.
* **Touch-Friendly Stepper**: Ergonomic $32\text{px}+$ touch targets on quantity controls with full ARIA accessibility attributes.

### 3. Clean SPA GitHub Pages Architecture
* **Clean History Routing**: Migrated from legacy `HashRouter` (`/#/category/handguns`) to clean HTML5 `BrowserRouter` (`/sector-7/category/handguns`).
* **SPA Redirect Bridge**: Integrated `spa-github-pages` protocol (`public/404.html` and `index.html` query decoder) ensuring deep links and browser reloads never 404 on static hosting.

### 4. Impeccable UI Craftsmanship
* **Strict Accessible Typography**: $12\text{px}$ minimum text floor (`text-xs` / `text-sm`), WCAG AAA high-contrast neutrals on deep charcoal surfaces (`#0a0a0a`), and `text-pretty` copy formatting to prevent awkward single-word line orphans.
* **Direct Mobile Header Access**: Dedicated header cart badge action visible on all viewport widths without requiring drawer expansion.

---

## 🏗️ Architecture & Component Topology

```mermaid
flowchart TD
    subgraph Client ["Client Browser Request"]
        A["Request: /sector-7/product/hg-1"]
    end

    subgraph GitHubPages ["GitHub Pages SPA Protocol"]
        B["404.html Redirect Hook"]
        C["Query Parameter Bridge: /?/..."]
        D["index.html History ReplaceState"]
    end

    subgraph ReactCore ["React 19 Application Core"]
        E["BrowserRouter basename='/sector-7'"]
        F["Header with Dynamic Cart Badge"]
        G["Telemetry Infinite Marquee"]
        H["App Route Switcher"]
    end

    subgraph Pages ["View Layer"]
        P1["HomePage with Category Filter"]
        P2["CategoryPage Division Grid"]
        P3["ProductPage Spec View"]
        P4["CartPage Requisition Manifest"]
    end

    subgraph State ["Global State & Services"]
        S1["CartContext State Provider"]
        S2["localStorage 'cart-storage' Cache"]
        S3["Sonner Heads-Up HUD"]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    E --> G
    E --> H
    H --> P1
    H --> P2
    H --> P3
    H --> P4
    P1 -.-> S1
    P2 -.-> S1
    P3 -.-> S1
    P4 -.-> S1
    S1 <--> S2
    S1 --> S3
```

---

## 🛠️ Tech Stack & Engineering Standards

| Dimension | Technology | Specification / Standard |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | React 19.2 + TypeScript Strict Mode |
| **Bundler** | [Vite 7](https://vitejs.dev/) | Sub-second HMR and optimized production trees |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Atomic engine with CSS variables and custom keyframe animations |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) | Headless, accessible navigation and component primitives |
| **Icons** | [Lucide React](https://lucide.dev/) | Precision vector tactical iconography |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) | Non-blocking dark-themed heads-up display |
| **Routing** | [React Router v7](https://reactrouter.com/) | HTML5 History API routing with GitHub Pages SPA redirect support |
| **Deployment** | [GitHub Actions](https://github.com/features/actions) | Automated production build and deployment to GitHub Pages |

---

## 🚀 Local Development Setup

To inspect and test Sector 7 Logistics on your local workstation:

### 1. Clone the Repository
```bash
git clone https://github.com/kanishk-upadhyay/sector-7.git
cd sector-7
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📄 License & Attribution

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete terms.

```
Copyright (c) 2026 Kanishk Upadhyay
All tactical trademarks and mockup imagery are the property of their respective owners.
```

<div align="center">
  <p><b>Sector 7 Defense Logistics</b> • <i>Authorized Command Personnel Only</i></p>
</div>
