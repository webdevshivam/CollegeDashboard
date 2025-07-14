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
      "fixed left-0 top-0 h-full w-64 bg-primary-900 text-white z-50 sidebar-transition transform",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="flex items-center justify-between p-6 border-b border-primary-800">
        <h1 className="text-xl font-bold">College Admin</h1>
        <button 
          onClick={onClose}
          className="lg:hidden text-white hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link key={item.name} href={item.href}>
                <a className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "text-white bg-primary-800" 
                    : "text-gray-300 hover:text-white hover:bg-primary-800"
                )}>
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
