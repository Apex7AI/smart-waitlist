import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WaitlistHero from "@/components/WaitlistHero";
import PracticalExamples from "@/components/PracticalExamples";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("waitlist");
  const navigate = useNavigate();

  const handleJoinWaitlist = () => {
    navigate('/auth', { state: { from: { pathname: '/waitlist-form' } } });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Navigation Tabs */}
        <div className="sticky top-0 z-50 bg-gradient-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card/50">
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
      </Tabs>
    </div>
  );
};

export default Index;
