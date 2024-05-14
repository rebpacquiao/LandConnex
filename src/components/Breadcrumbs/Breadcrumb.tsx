import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col bread-crumb gap-3 sm:flex-col sm:items-start sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="text-xs" to="/">
              Dashboard /
            </Link>
          </li>
          <li className="text-xs text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
