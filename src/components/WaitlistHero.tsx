import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Zap, Shield } from "lucide-react";

interface WaitlistHeroProps {
  onJoinWaitlist: () => void;
}

const WaitlistHero = ({ onJoinWaitlist }: WaitlistHeroProps) => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Construa, gerencie e treine sua{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Força de Trabalho IA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            A maneira mais simples de automatizar com inteligência artificial. 
            Junte-se à lista de espera e seja um dos primeiros a revolucionar sua empresa.
          </p>

          {/* CTA Button */}
          <Button 
            onClick={onJoinWaitlist}
            size="lg"
            className="mb-16 px-8 py-6 text-lg bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Quero Participar da Lista de Espera
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Acesso Exclusivo</h3>
              <p className="text-muted-foreground">
                Seja um dos primeiros a testar nossa plataforma revolucionária antes do lançamento público.
              </p>
            </div>

            <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <Zap className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Setup Rápido</h3>
              <p className="text-muted-foreground">
                Configure sua primeira automação em minutos, não horas. Interface intuitiva e onboarding guiado.
              </p>
            </div>

            <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card hover:shadow-glow transition-all duration-300">
              <Shield className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-3">Preços Especiais</h3>
              <p className="text-muted-foreground">
                Membros da lista de espera recebem desconto exclusivo e condições especiais de early adopters.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Já somos <strong className="text-primary">500+</strong> empresas na lista de espera
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">A</span>
                </div>
                <span className="text-sm">Startups</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">B</span>
                </div>
                <span className="text-sm">Médias Empresas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">C</span>
                </div>
                <span className="text-sm">Corporações</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistHero;