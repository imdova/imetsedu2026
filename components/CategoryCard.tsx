import Link from 'next/link';
import { Category } from '@/types/course';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/courses?category=${category.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-500">
        <div className="text-4xl mb-4">{category.icon}</div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600">
          {category.courseCount} courses
        </p>
      </div>
    </Link>
  );
}
