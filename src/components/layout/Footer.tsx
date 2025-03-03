import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { Icon: Facebook, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-slate-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MMA Hub</h3>
            <p className="text-gray-400">Your premier source for combat sports news and updates.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">UFC</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">PFL</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">ONE Championship</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <a 
                  key={index} 
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MMA Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}