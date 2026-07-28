import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface MainNavProps {
  currentSection?: 'human' | 'pets';
  logo?: React.ReactNode;
}

export const MainNav: React.FC<MainNavProps> = ({
  currentSection = 'human',
  logo,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const humanLinks = [
    { label: 'Home', href: '/' },
    { label: 'Conditions', href: '/learn/conditions' },
    { label: 'Exercise & Movement', href: '/learn/exercise' },
    { label: 'Nutrition', href: '/learn/nutrition' },
    { label: 'Benefits & Support', href: '/learn/support' },
  ];

  const petLinks = [
    { label: 'Home', href: '/pets' },
    { label: 'By Pet Type', href: '/pets/by-type' },
    { label: 'Exercise for Pets', href: '/pets/exercise' },
    { label: 'Pet Nutrition', href: '/pets/nutrition' },
    { label: 'Owner Resources', href: '/pets/resources' },
  ];

  const currentLinks = currentSection === 'pets' ? petLinks : humanLinks;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-red-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-red-700 hover:text-red-800 transition-colors">
              {logo || (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">❤️🐾</span>
                  <span className="hidden sm:inline">Living With Arthritis</span>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {currentLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-red-700 hover:bg-red-50 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Section Toggle */}
            <div className="hidden md:flex items-center gap-2 border-l border-gray-300 pl-4">
              <a
                href="/"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                  currentSection === 'human'
                    ? 'bg-red-100 text-red-800'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">❤️</span>
                <span className="hidden sm:inline">Humans</span>
              </a>
              <a
                href="/pets"
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                  currentSection === 'pets'
                    ? 'bg-red-100 text-red-800'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">🐾</span>
                <span className="hidden sm:inline">Pets</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:bg-red-50 rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-2">
              {/* Section Tabs */}
              <div className="flex gap-2 mb-2 px-2">
                <a
                  href="/"
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md font-medium text-sm transition-all ${
                    currentSection === 'human'
                      ? 'bg-red-100 text-red-800'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  <span>❤️</span>
                  <span>Humans</span>
                </a>
                <a
                  href="/pets"
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-md font-medium text-sm transition-all ${
                    currentSection === 'pets'
                      ? 'bg-red-100 text-red-800'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  <span>🐾</span>
                  <span>Pets</span>
                </a>
              </div>

              {/* Links */}
              {currentLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-black hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default MainNav;
