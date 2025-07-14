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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-accent-100 dark:bg-accent-900/20 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary-100 dark:bg-secondary-900/20 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-2xl border-0">
          <CardHeader className="space-y-6 pb-6">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                College Admin Portal
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to manage your institution
              </p>
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
                className="w-full h-12 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium shadow-lg"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                Forgot your password?
              </button>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm">
                <p className="text-gray-600 dark:text-gray-400 mb-2">Demo Credentials:</p>
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Username:</strong> admin<br />
                  <strong>Password:</strong> admin123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}