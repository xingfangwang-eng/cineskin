import Link from 'next/link';

interface BreadcrumbProps {
  items: {
    label: string;
    url: string;
    isActive?: boolean;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="text-sm text-slate-600 mb-6">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index}>
            {item.isActive ? (
              <span className="text-slate-900 font-medium">{item.label}</span>
            ) : (
              <>
                <Link href={item.url} className="hover:text-blue-600 transition-colors">
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="mx-2 text-slate-400">/</span>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;