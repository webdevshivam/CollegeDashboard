import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/dashboard/layout";
import Dashboard from "@/pages/dashboard";
import Faculty from "@/pages/faculty";
import Banner from "@/pages/banner";
import News from "@/pages/news";
import Ipr from "@/pages/ipr";
import Management from "@/pages/management";
import Cells from "@/pages/cells";
import Gallery from "@/pages/gallery";
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
