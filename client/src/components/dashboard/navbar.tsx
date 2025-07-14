import { useState } from "react";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

interface NavbarProps {
  onMenuClick: () => void;
}

const pageTitle = {
  "/": "Dashboard",
  "/faculty": "Faculty Management",
  "/banner": "Banner Management",
  "/news": "News/Notice Management",
  "/ipr": "IPR Management",
  "/management": "Management Team",
  "/cells": "Cells & Committees",
  "/gallery": "Gallery Management",
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [location] = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const currentTitle = pageTitle[location as keyof typeof pageTitle] || "Dashboard";

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button 
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900 mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900">{currentTitle}</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          
          <button className="relative text-gray-600 hover:text-gray-900">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-secondary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
            >
              <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">AD</span>
              </div>
              <span className="font-medium">Admin User</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </button>
                  <div className="border-t border-gray-200"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
