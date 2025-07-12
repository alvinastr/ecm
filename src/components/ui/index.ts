// Navigation Components
export { default as NavigationButton } from './NavigationButton';
export { default as Breadcrumb } from './Breadcrumb';
export { default as NavigationTabs } from './NavigationTabs';
export { default as BackButton } from './BackButton';

// Types
export interface NavigationButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  replace?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
  isLast?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactNode;
  className?: string;
}

export interface NavigationTab {
  name: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface NavigationTabsProps {
  tabs: NavigationTab[];
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface BackButtonProps {
  href?: string;
  fallbackHref?: string;
  label?: string;
  variant?: 'button' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}
