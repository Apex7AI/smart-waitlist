import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";
import {
  Users,
  Zap,
  Gift,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  FileText,
  Rocket,
  MessageCircle
} from "lucide-react";

const GrupoVIP = () => {
  const whatsappLink = "https://chat.whatsapp.com/FCQds4ezSZq92BGXnaND2E";
  const { trackWhatsAppClick } = useFacebookPixel();

  // Handler para clique manual no botão
  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    window.open(whatsappLink, "_blank");
  };

  const exemplosDestaque = [
    {
      category: "Pesquisa",
      title: "Análise de concorrentes",
      desc: "Mapeie posicionamento, ofertas e oportunidades com muito mais rapidez."
    },
    {
      category: "Dados",
      title: "Análise de planilhas",
      desc: "Encontre padrões, inconsistências e insights acionáveis sem depender de trabalho manual."
    },
    {
      category: "Relatórios",
      title: "Dashboards e relatórios",
      desc: "Estruture conclusões e indicadores de forma mais clara para tomar melhores decisões."
    },
    {
      category: "Vendas",
      title: "Propostas comerciais",
      desc: "Monte estratégia, escopo e cronograma com muito menos retrabalho."
    },
    {
      category: "Conteúdo",
      title: "Landing pages e materiais",
      desc: "Organize oferta, copy e estrutura de páginas e documentos com mais velocidade."
    },
    {
      category: "Operação",
      title: "Agenda, e-mails e rotina",
      desc: "Resuma informações importantes e organize prioridades do negócio no dia a dia."
    }
  ];

  const beneficios = [
    {
      icon: Clock,
      title: "Mais Produtividade",
      description: "Economize tempo em pesquisas, análises, relatórios e tarefas operacionais." 
    },
    {
      icon: Zap,
      title: "Mais Velocidade",
      description: "Use estruturas prontas para sair da tela em branco e executar com mais rapidez."
    },
    {
      icon: FileText,
      title: "Aplicações Reais",
      description: "Veja exemplos próximos de como usar agentes em negócios, não só teoria."
    },
    {
      icon: Gift,
      title: "Entrada Gratuita",
      description: "Entre no grupo, receba o pack inicial e acompanhe os próximos materiais."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section - Mobile First */}
      <div className="pb-8 px-4 pt-6">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge de Urgência */}
          <div className="inline-flex items-center gap-2 bg-gradient-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Produtividade real com agentes de IA
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Ganhe mais{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              velocidade e produtividade
            </span>
            <br className="hidden md:block" /> com agentes de IA
          </h1>

          <p className="text-base md:text-xl text-muted-foreground mb-6 leading-relaxed">
            Entre no grupo e receba gratuitamente prompts e exemplos reais para pesquisar concorrentes,
            analisar dados, criar propostas e organizar tarefas com menos retrabalho.
          </p>

          {/* Botão WhatsApp - DESTAQUE MÁXIMO */}
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-3 w-full max-w-md mx-auto px-8 py-5 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-8 relative overflow-hidden"
          >
            {/* Shine effect - brilho passando continuamente */}
            <span className="absolute inset-0 -translate-x-full animate-[shine_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <MessageCircle className="w-6 h-6" />
            ENTRAR NO GRUPO E RECEBER O PACK
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Mensagem de direcionamento */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-primary/5 rounded-lg p-3 max-w-md mx-auto border border-primary/10">
            <Clock className="w-4 h-4 text-primary" />
            <span>Grupo gratuito • pack inicial • exemplos reais de uso em negócios</span>
          </div>

          {/* Micro-prova social */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>Para empresários e equipes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>Aplicações práticas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4" />
              <span>Entrada gratuita</span>
            </div>
          </div>

          {/* Mensagem principal */}
          <Card className="bg-gradient-card border-border shadow-card mb-8 max-w-2xl mx-auto">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                    <strong className="text-foreground">No grupo você vai encontrar aplicações como:</strong>
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs md:text-sm text-muted-foreground mb-3">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      Pesquisar concorrentes
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      Analisar planilhas e dados
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      Criar propostas e relatórios
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      Organizar tarefas e rotina
                    </li>
                  </ul>
                  <p className="text-sm md:text-base text-foreground font-medium">
                    O foco é simples: mostrar usos práticos que ajudam você a ganhar tempo,
                    ter mais clareza e aumentar a produtividade do negócio.
                    <span className="text-primary ml-1">Ao entrar, você recebe gratuitamente o pack inicial e acompanha os próximos exemplos.</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {beneficios.map((beneficio, index) => {
            const IconComponent = beneficio.icon;
            return (
              <Card
                key={index}
                className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300"
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold mb-2">{beneficio.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{beneficio.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Preview de usos e materiais */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <Badge variant="secondary" className="mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              O que você vai encontrar
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Exemplos práticos para <span className="text-primary">aplicar no negócio</span>
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto px-4">
              Você não vai encontrar só teoria. Estes são alguns dos usos que já estamos mostrando
              e expandindo com novos conteúdos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {exemplosDestaque.map((exemplo, index) => (
              <Card
                key={index}
                className="bg-gradient-card border-border shadow-card hover:border-primary/40 transition-all duration-300"
              >
                <CardContent className="p-4 md:p-5 text-left">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary mb-3">
                    {exemplo.category}
                  </span>
                  <h3 className="text-sm md:text-base font-semibold mb-2">{exemplo.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{exemplo.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dica de Ouro */}
          <Card className="mt-8 bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 mb-2">O mais importante</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Você não entra só para ver prompts soltos. Você entra para acompanhar usos reais,
                    materiais práticos e exemplos próximos de como aplicar agentes de IA no contexto do seu negócio.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* O que você recebe ao entrar */}
        <Card className="bg-gradient-primary/5 border-primary/20 mb-12 md:mb-16">
          <CardContent className="p-6 md:p-10 md:p-12">
            <div className="text-center mb-6 md:mb-8">
              <Rocket className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                O que você recebe ao entrar
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Pack Inicial</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Acesso ao material inicial com prompts e exemplos que já estão em uso.
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Aplicação Prática</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Conteúdos próximos da prática para usar IA com mais produtividade e clareza.
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Gift className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Próximos Materiais</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Quem estiver no grupo acompanha novos exemplos e condições especiais quando abrirmos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Final */}
        <div className="text-center pb-8">
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-3 w-full max-w-md mx-auto px-8 py-5 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6 relative overflow-hidden"
          >
            {/* Shine effect - brilho passando continuamente */}
            <span className="absolute inset-0 -translate-x-full animate-[shine_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <MessageCircle className="w-6 h-6" />
            QUERO RECEBER O PACK NO GRUPO
            <ArrowRight className="w-6 h-6" />
          </button>

          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            🎁 <strong>Gratuito para entrar</strong> • Pack inicial • Exemplos reais de uso
          </p>

          {/* Rodapé da Marca */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Oferecimento: <strong className="text-primary">Apex7AI Agent Lynx</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Agentes de IA aplicados à produtividade, operação e crescimento do negócio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrupoVIP;
