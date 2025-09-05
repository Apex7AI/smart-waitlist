import React, { useState } from "react";
import WaitlistHero from "@/components/WaitlistHero";
import WaitlistForm from "@/components/WaitlistForm";

const Index = () => {
  const [showForm, setShowForm] = useState(false);

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

  return <WaitlistHero onJoinWaitlist={() => setShowForm(true)} />;
};

export default Index;
