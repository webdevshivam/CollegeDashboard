import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Image, Newspaper, Camera } from "lucide-react";

interface DashboardStats {
  faculty: number;
  banners: number;
  news: number;
  gallery: number;
}

export default function Dashboard() {
  const { data: facultyData = [] } = useQuery({
    queryKey: ['/api/faculty'],
  });

  const { data: bannersData = [] } = useQuery({
    queryKey: ['/api/banners'],
  });

  const { data: newsData = [] } = useQuery({
    queryKey: ['/api/news'],
  });

  const { data: galleryData = [] } = useQuery({
    queryKey: ['/api/gallery'],
  });

  const stats: DashboardStats = {
    faculty: facultyData.length,
    banners: bannersData.length,
    news: newsData.length,
    gallery: galleryData.length,
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="card-hover transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Faculty</p>
                <p className="text-3xl font-bold text-gray-900">{stats.faculty}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-primary-900" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Banners</p>
                <p className="text-3xl font-bold text-gray-900">{stats.banners}</p>
              </div>
              <div className="bg-accent-100 p-3 rounded-full">
                <Image className="w-8 h-8 text-accent-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">News/Notices</p>
                <p className="text-3xl font-bold text-gray-900">{stats.news}</p>
              </div>
              <div className="bg-secondary-100 p-3 rounded-full">
                <Newspaper className="w-8 h-8 text-secondary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gallery Items</p>
                <p className="text-3xl font-bold text-gray-900">{stats.gallery}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {newsData.slice(0, 3).map((item: any) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {newsData.length === 0 && (
              <p className="text-sm text-gray-500">No recent activity</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-hover transition-all duration-300">
          <CardContent className="p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Add New Faculty</h4>
            <p className="text-sm text-gray-600 mb-4">Quickly add a new faculty member to the system</p>
            <button className="w-full bg-primary-900 text-white py-2 px-4 rounded-lg hover:bg-primary-800 transition-colors">
              Add Faculty
            </button>
          </CardContent>
        </Card>
        
        <Card className="card-hover transition-all duration-300">
          <CardContent className="p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Upload Banner</h4>
            <p className="text-sm text-gray-600 mb-4">Upload and manage banner images</p>
            <button className="w-full bg-accent-500 text-white py-2 px-4 rounded-lg hover:bg-accent-600 transition-colors">
              Upload Banner
            </button>
          </CardContent>
        </Card>
        
        <Card className="card-hover transition-all duration-300">
          <CardContent className="p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Publish Notice</h4>
            <p className="text-sm text-gray-600 mb-4">Create and publish a new notice</p>
            <button className="w-full bg-secondary-600 text-white py-2 px-4 rounded-lg hover:bg-secondary-700 transition-colors">
              Publish Notice
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
