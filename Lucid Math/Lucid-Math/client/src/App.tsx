import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { MultiplicationProvider } from "./context/MultiplicationContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "@/pages/Home";
import MultiplicationTable from "@/pages/MultiplicationTable";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/table/:number" component={MultiplicationTable} />
      <Route path="/quiz/:number" component={Quiz} />
      <Route path="/results" component={Results} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <MultiplicationProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </MultiplicationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
