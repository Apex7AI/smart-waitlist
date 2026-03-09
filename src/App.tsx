import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { FacebookPixel } from "@/components/FacebookPixel";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import WaitlistFormPage from "./pages/WaitlistForm";
import GrupoVIP from "./pages/GrupoVIP";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Pixel ID do Facebook - Produção (EasyPanel)
// Adicione no EasyPanel: VITE_FACEBOOK_PIXEL_ID=766465409575936
const FACEBOOK_PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID || "766465409575936";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        {/* Facebook Pixel - Rastreamento de eventos */}
        {FACEBOOK_PIXEL_ID && <FacebookPixel pixelId={FACEBOOK_PIXEL_ID} />}

        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/waitlist-form" element={<WaitlistFormPage />} />
            <Route path="/grupo" element={<GrupoVIP />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
