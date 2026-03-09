import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, MessageCircle } from "lucide-react";
import WaitlistHero from "@/components/WaitlistHero";
import PracticalExamples from "@/components/PracticalExamples";
import GrupoVIP from "./GrupoVIP";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("waitlist");
  const navigate = useNavigate();
  const { user, isAdmin, profile } = useAuth();

  const handleJoinWaitlist = () => {
    navigate('/auth', { state: { from: { pathname: '/waitlist-form' } } });
  };

  const handleGrupoVIP = () => {
    navigate('/grupo');
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Admin Access Button - Only show if user is authenticated and is admin */}
      {user && isAdmin && profile && (
        <div className="fixed top-4 right-4 z-[60]">
          <Button asChild className="bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Painel Admin
            </Link>
          </Button>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Navigation Tabs */}
        <div className="sticky top-0 z-50 bg-gradient-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-card/50">
              <TabsTrigger
                value="waitlist"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
              >
                Lista de Espera
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
              >
                Exemplos Práticos
              </TabsTrigger>
              <TabsTrigger
                value="grupo"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                onClick={handleGrupoVIP}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Grupo VIP
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Contents */}
        <TabsContent value="waitlist" className="mt-0">
          <WaitlistHero onJoinWaitlist={handleJoinWaitlist} />
        </TabsContent>

        <TabsContent value="examples" className="mt-0">
          <PracticalExamples />
        </TabsContent>

        <TabsContent value="grupo" className="mt-0">
          <GrupoVIP />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
