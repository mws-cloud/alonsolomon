import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  return null;
};
import Index from "./pages/Index";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CaseStudies from "./pages/CaseStudies";
import Guides from "./pages/Guides";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import Team from "./pages/Team";
import Careers from "./pages/Careers";
import InstantConsultation from "./pages/InstantConsultation";
import Methodology from "./pages/Methodology";
import AttorneyProfile from "./pages/AttorneyProfile";
import ConflictResolution from "./pages/ConflictResolution";
import JurisdictionRace from "./pages/JurisdictionRace";
import ParentalResponsibility from "./pages/ParentalResponsibility";
import ChildSupport from "./pages/ChildSupport";
import ChildSupportDifferences from "./pages/ChildSupportDifferences";
import ParentalAlienation from "./pages/ParentalAlienation";
import ParentingAgreements from "./pages/ParentingAgreements";
import InheritanceAssets from "./pages/InheritanceAssets";
import PensionDivision from "./pages/PensionDivision";
import EarningCapacity from "./pages/EarningCapacity";
import SpousalSupport from "./pages/SpousalSupport";
import DivorceGrounds from "./pages/DivorceGrounds";
import KetubahLawsuit from "./pages/KetubahLawsuit";
import KetubahVsProperty from "./pages/KetubahVsProperty";
import PrenuptialAgreements from "./pages/PrenuptialAgreements";
import WillsAndInheritance from "./pages/WillsAndInheritance";
import AppealFamilyLaw from "./pages/AppealFamilyLaw";
import AdminLeads from "./pages/AdminLeads";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/press" element={<Press />} />
          <Route path="/career" element={<Careers />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/legal-methodology-family-law" element={<Methodology />} />
          <Route path="/adv-alon-solomon-profile" element={<AttorneyProfile />} />
          <Route path="/conflict-resolution-divorce-israel-2026" element={<ConflictResolution />} />
          <Route path="/jurisdiction-race-family-vs-rabbinical-court" element={<JurisdictionRace />} />
          <Route path="/parental-responsibility-and-timeshare" element={<ParentalResponsibility />} />
          <Route path="/child-support-israel-2026-guide" element={<ChildSupport />} />
          <Route path="/child-support-rabbinical-vs-family-court-nuances" element={<ChildSupportDifferences />} />
          <Route path="/parental-alienation-legal-strategy" element={<ParentalAlienation />} />
          <Route path="/parenting-agreements-and-mediation" element={<ParentingAgreements />} />
          <Route path="/inheritance-and-pre-marital-assets-division" element={<InheritanceAssets />} />
          <Route path="/pension-division-experts-israel" element={<PensionDivision />} />
          <Route path="/earning-capacity-and-career-assets-divorce" element={<EarningCapacity />} />
          <Route path="/spousal-support-and-ketubah-israel" element={<SpousalSupport />} />
          <Route path="/divorce-grounds-and-specific-housing" element={<DivorceGrounds />} />
          <Route path="/ketubah-lawsuit-rabbinical-court-israel" element={<KetubahLawsuit />} />
          <Route path="/ketubah-vs-property-division-israel" element={<KetubahVsProperty />} />
          <Route path="/prenuptial-agreements-israel-guide" element={<PrenuptialAgreements />} />
          <Route path="/inheritance-conflicts-and-wills-strategy" element={<WillsAndInheritance />} />
          <Route path="/appeal-family-law" element={<AppealFamilyLaw />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/admin/leads" element={<AdminLeads />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
