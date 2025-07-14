import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple validation for demo purposes
    if (username === "admin" && password === "admin123") {
      setTimeout(() => {
        setLocation("/");
      }, 1000);
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full opacity-50 blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-accent-100 dark:bg-accent-900/20 rounded-full opacity-50 blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary-100 dark:bg-secondary-900/20 rounded-full opacity-30 blur-3xl animate-pulse-soft" style={{animationDelay: '2s'}}></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-primary-300 dark:bg-primary-700 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-accent-300 dark:bg-accent-700 rounded-full animate-pulse opacity-60" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary-300 dark:bg-secondary-700 rounded-full animate-pulse opacity-60" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md animate-fadeIn">
        <Card className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 shadow-2xl border-0 overflow-hidden">
          {/* Card shimmer effect */}
          <div className="absolute inset-0 shimmer opacity-10"></div>
          
          <CardHeader className="space-y-6 pb-6 relative">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl flex items-center justify-center shadow-2xl relative animate-pulse-soft">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-white relative z-10" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center space-y-3">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                College Admin Portal
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Sign in to manage your institution
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 dark:text-green-400">System Online</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium shadow-lg btn-primary relative overflow-hidden"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                Forgot your password?
              </button>
              
              <div className="bg-gradient-to-r from-gray-50 to-primary-50 dark:from-gray-800 dark:to-primary-900/20 rounded-xl p-4 text-sm border border-primary-200 dark:border-primary-800">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mr-2"></div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Demo Credentials:</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>Username:</strong> <code className="bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded">admin</code>
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    <strong>Password:</strong> <code className="bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded">admin123</code>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}