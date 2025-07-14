import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, Users, Image, Newspaper, FileText, 
  UserCheck, Folder, Camera, X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Faculty Management", href: "/faculty", icon: Users },
  { name: "Banner Management", href: "/banner", icon: Image },
  { name: "News/Notice", href: "/news", icon: Newspaper },
  { name: "IPR Management", href: "/ipr", icon: FileText },
  { name: "Management Team", href: "/management", icon: UserCheck },
  { name: "Cells & Committees", href: "/cells", icon: Folder },
  { name: "Gallery", href: "/gallery", icon: Camera },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-primary-900 to-primary-800 text-white z-50 sidebar-transition transform shadow-2xl",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="flex items-center justify-between p-6 border-b border-primary-800/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3 animate-slideIn">
          <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-900" fill="currentColor">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">College Admin</h1>
            <p className="text-xs text-primary-200">Management Portal</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden text-white hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2 custom-scrollbar overflow-y-auto">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.name} href={item.href}>
                <button 
                  className={cn(
                    "w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-left group animate-slideIn",
                    isActive 
                      ? "text-white bg-white/20 backdrop-blur-sm shadow-lg" 
                      : "text-gray-300 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm"
                  )}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <Icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
