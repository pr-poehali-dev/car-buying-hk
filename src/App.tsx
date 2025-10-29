
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import LeadsAdmin from "./pages/LeadsAdmin";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import BlogPost3 from "./pages/BlogPost3";
import VykupBityhAvto from "./pages/VykupBityhAvto";
import VykupKreditnyhAvto from "./pages/VykupKreditnyhAvto";
import SrochnyyVykup from "./pages/SrochnyyVykup";
import DirectImport from "./pages/DirectImport";
import EvaluationPopup from "./components/EvaluationPopup";

const queryClient = new QueryClient();

function RedirectHandler() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);
  
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/leads" element={<LeadsAdmin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/kak-prodat-bitoe-avto-posle-dtp" element={<BlogPost1 />} />
          <Route path="/blog/vykup-kreditnykh-avtomobiley" element={<BlogPost2 />} />
          <Route path="/blog/srochnyy-vykup-avto" element={<BlogPost3 />} />
          <Route path="/vykup-bityh-avto" element={<VykupBityhAvto />} />
          <Route path="/vykup-kreditnyh-avto" element={<VykupKreditnyhAvto />} />
          <Route path="/srochnyy-vykup-avto" element={<SrochnyyVykup />} />
          <Route path="/admin/direct-import" element={<DirectImport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <EvaluationPopup />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;