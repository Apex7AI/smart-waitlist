import React, { useState } from "react";
import WaitlistHero from "@/components/WaitlistHero";
import WaitlistForm from "@/components/WaitlistForm";
import PracticalExamples from "@/components/PracticalExamples";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("waitlist");

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-background py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Junte-se à <span className="bg-gradient-primary bg-clip-text text-transparent">Lista de Espera</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nos ajude a entender melhor suas necessidades para criarmos a solução perfeita para você.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </div>
    );
  }

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
          <WaitlistHero onJoinWaitlist={() => setShowForm(true)} />
        </TabsContent>
        
        <TabsContent value="examples" className="mt-0">
          <PracticalExamples />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
