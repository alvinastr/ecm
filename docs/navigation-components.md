# Komponen Navigasi

Dokumentasi untuk komponen navigasi yang telah ditambahkan ke aplikasi e-commerce.

## 🧭 Komponen yang Tersedia

### 1. NavigationButton
Komponen button yang dapat digunakan untuk navigasi dengan berbagai variant dan ukuran.

```tsx
import { NavigationButton } from '@/components/ui';

// Contoh penggunaan
<NavigationButton href="/profile" variant="primary" size="md">
  Go to Profile
</NavigationButton>

<NavigationButton onClick={handleClick} variant="outline" loading={isLoading}>
  Save Changes
</NavigationButton>
```

**Props:**
- `href?`: URL tujuan navigasi
- `variant?`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size?`: 'sm' | 'md' | 'lg'
- `onClick?`: Function handler
- `disabled?`: Boolean untuk disable button
- `loading?`: Boolean untuk menampilkan loading state
- `external?`: Boolean untuk link eksternal
- `replace?`: Boolean untuk replace history

### 2. Breadcrumb
Komponen breadcrumb untuk menampilkan navigasi hierarki halaman.

```tsx
import { Breadcrumb } from '@/components/ui';

const breadcrumbItems = [
  { name: 'Products', href: '/search' },
  { name: 'iPhone 15', href: '/product/123', isLast: true }
];

<Breadcrumb items={breadcrumbItems} showHome={true} />
```

**Props:**
- `items`: Array item breadcrumb
- `showHome?`: Boolean untuk menampilkan icon home
- `separator?`: Custom separator component
- `className?`: Custom CSS class

### 3. NavigationTabs
Komponen tab navigation dengan berbagai variant styling.

```tsx
import { NavigationTabs } from '@/components/ui';

const tabs = [
  { name: 'Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
  { name: 'Orders', href: '/orders', badge: 5 },
  { name: 'Reviews', href: '/reviews' }
];

<NavigationTabs tabs={tabs} variant="underline" size="md" />
```

**Props:**
- `tabs`: Array tab data
- `variant?`: 'default' | 'pills' | 'underline'
- `size?`: 'sm' | 'md' | 'lg'
- `className?`: Custom CSS class

### 4. BackButton
Komponen button untuk navigasi kembali.

```tsx
import { BackButton } from '@/components/ui';

// Button icon
<BackButton fallbackHref="/" variant="button" />

// Link dengan text
<BackButton fallbackHref="/search" variant="link" label="Back to Products" />
```

**Props:**
- `href?`: URL tujuan spesifik
- `fallbackHref?`: URL fallback jika history kosong
- `label?`: Text label untuk button
- `variant?`: 'button' | 'link'
- `size?`: 'sm' | 'md' | 'lg'
- `onClick?`: Custom click handler

## 🎨 Utility Functions

### Navigation Styling
Utility functions untuk styling konsisten:

```tsx
import { 
  getNavigationButtonClass,
  getNavigationLinkClass,
  getIconButtonClass,
  getBreadcrumbClass
} from '@/lib/utils';

// Styling button
const buttonClass = getNavigationButtonClass('primary');

// Styling link aktif
const linkClass = getNavigationLinkClass(isActive);

// Styling icon button
const iconClass = getIconButtonClass('md');
```

### Navigation Helpers
Helper functions untuk logika navigasi:

```tsx
import { 
  generateBreadcrumbs,
  isActiveRoute 
} from '@/lib/utils';

// Generate breadcrumbs dari pathname
const breadcrumbs = generateBreadcrumbs('/product/123/reviews');

// Check active route
const isActive = isActiveRoute(currentPath, targetPath, exact);
```

## 📱 Implementasi

### Di Header (ProfileDropdown)
Header sekarang menggunakan `ProfileDropdown` yang menampilkan:
- Avatar dengan initial user
- Nama user (dari email)
- Dropdown menu dengan navigasi ke profile, orders, reviews
- Logout functionality

### Di Profile Page
Profile page menggunakan:
- `Breadcrumb` untuk navigasi hierarki
- `NavigationTabs` untuk tab profile/orders/reviews/security
- `BackButton` untuk kembali
- `NavigationButton` untuk actions

### Di Product Page
Product page menggunakan:
- `Breadcrumb` untuk Home > Products > Product Name
- `BackButton` untuk kembali ke search

## 🚀 Konsistensi Design
Semua komponen mengikuti design system yang konsisten:
- Warna: Black primary, gray secondary
- Typography: Consistent sizing dan weight
- Spacing: Consistent padding dan margin
- Interactive states: Hover, focus, disabled
- Loading states: Spinner animation

## 🔧 Customization
Semua komponen dapat di-customize dengan:
- `className` prop untuk override styles
- Variant props untuk different appearances
- Size props untuk different dimensions
- Custom icons dan content

Komponen ini membantu menciptakan navigasi yang konsisten dan user-friendly di seluruh aplikasi.
