import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#030256] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <img
                src="/images/logo.png"
                alt="IMETS school of business"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm">
              Learn new skills and advance your career with our comprehensive online courses.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Categories</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/courses?category=web" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link href="/courses?category=data" className="hover:text-white transition-colors">Data Science</Link></li>
              <li><Link href="/courses?category=mobile" className="hover:text-white transition-colors">Mobile Development</Link></li>
              <li><Link href="/courses?category=design" className="hover:text-white transition-colors">Design</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#04036a] mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
          <p>&copy; 2024 IMETS school of business. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
