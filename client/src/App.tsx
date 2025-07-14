import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-context";
import DashboardLayout from "@/components/dashboard/layout";
import Dashboard from "@/pages/dashboard";
import Faculty from "@/pages/faculty";
import Banner from "@/pages/banner";
import News from "@/pages/news";
import Ipr from "@/pages/ipr";
import Management from "@/pages/management";
import Cells from "@/pages/cells";
import Gallery from "@/pages/gallery";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" nest>
        <DashboardLayout>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/faculty" component={Faculty} />
            <Route path="/banner" component={Banner} />
            <Route path="/news" component={News} />
            <Route path="/ipr" component={Ipr} />
            <Route path="/management" component={Management} />
            <Route path="/cells" component={Cells} />
            <Route path="/gallery" component={Gallery} />
            <Route component={NotFound} />
          </Switch>
        </DashboardLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="college-admin-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
