import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

export interface BreadcrumbItem {
  name: string;
  path: string;
  position: number;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export function BreadcrumbSchema({ items, baseUrl = 'https://livingwitharthritis.org.uk' }: BreadcrumbSchemaProps) {
  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item) => ({
        '@type': 'ListItem',
        position: item.position,
        name: item.name,
        item: `${baseUrl}${item.path}`,
      })),
    }),
    [items, baseUrl]
  );

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// Helper to generate breadcrumbs from current path
export const generateBreadcrumbsFromPath = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/', position: 1 },
  ];

  if (pathname === '/') return breadcrumbs;

  const parts = pathname.split('/').filter(Boolean);
  let currentPath = '';

  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    const displayName = part
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      name: displayName,
      path: currentPath,
      position: index + 2,
    });
  });

  return breadcrumbs;
};

// Breadcrumb UI Component (for display)
interface BreadcrumbUIProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbUI({ items, className = '' }: BreadcrumbUIProps) {
  return (
    <nav className={`text-sm breadcrumb ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-600" aria-current="page">
                {item.name}
              </span>
            ) : (
              <a
                href={item.path}
                className="text-primary hover:underline"
                itemProp="url"
              >
                <span itemProp="name">{item.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
