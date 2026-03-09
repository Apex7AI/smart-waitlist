import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Zap,
  Gift,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  Video,
  FileText,
  Lightbulb,
  Rocket,
  MessageCircle
} from "lucide-react";

const GrupoVIP = () => {
  const whatsappLink = "https://chat.whatsapp.com/FCQds4ezSZq92BGXnaND2E";

  const prompts = [
    { block: "PESQUISA E ANÁLISE", title: "Concorrentes", desc: "Pesquise 5 principais concorrentes e gere relatório comparativo" },
    { block: "PESQUISA E ANÁLISE", title: "Pesquisa de Mercado", desc: "Identifique tendências, oportunidades e desafios do setor" },
    { block: "PESQUISA E ANÁLISE", title: "Tendências", desc: "Liste novas tecnologias e mudanças no comportamento do consumidor" },
    { block: "PESQUISA E ANÁLISE", title: "Análise de Oportunidades", desc: "Estratégias de crescimento para pequenas e médias empresas" },

    { block: "DADOS E RELATÓRIOS", title: "Análise de Planilha", desc: "Identifique padrões, inconsistências e oportunidades de melhoria" },
    { block: "DADOS E RELATÓRIOS", title: "Relatório Executivo", desc: "Crie relatório com descobertas, indicadores e recomendações" },
    { block: "DADOS E RELATÓRIOS", title: "Insights de Dados", desc: "Três principais insights estratégicos para tomada de decisão" },
    { block: "DADOS E RELATÓRIOS", title: "Dashboard", desc: "Organize dados em estrutura de dashboard para análise rápida" },

    { block: "DOCUMENTOS E PROPOSTAS", title: "Proposta Comercial", desc: "Crie proposta com análise, estratégia, cronograma e investimento" },
    { block: "DOCUMENTOS E PROPOSTAS", title: "Plano de Marketing", desc: "Estratégias de aquisição, canais e cronograma de execução" },
    { block: "DOCUMENTOS E PROPOSTAS", title: "Relatório Estratégico", desc: "Documento profissional estruturado para apresentação" },
    { block: "DOCUMENTOS E PROPOSTAS", title: "Apresentação", desc: "Apresentação estratégica com análise e recomendações" },

    { block: "PRODUTIVIDADE", title: "Planejamento Semanal", desc: "Plano de tarefas: marketing, vendas, operação e resultados" },
    { block: "PRODUTIVIDADE", title: "Organização de Tarefas", desc: "Classifique tarefas por prioridade e impacto" },
    { block: "PRODUTIVIDADE", title: "Agenda Estratégica", desc: "Equilibre estratégia, operação e crescimento do negócio" },

    { block: "CONTEÚDO", title: "Ideias de Conteúdo", desc: "10 ideias para redes sociais com foco educativo" },
    { block: "CONTEÚDO", title: "Calendário Editorial", desc: "Calendário mensal com tipos de conteúdo e frequência" },

    { block: "NEGÓCIOS", title: "Cliente Ideal", desc: "Defina perfil demográfico, dores e motivações de compra" },
    { block: "NEGÓCIOS", title: "Proposta de Valor", desc: "Crie uma proposta de valor clara e diferenciada" },
    { block: "NEGÓCIOS", title: "Plano de Crescimento", desc: "Expansão, melhorias operacionais e aquisição de clientes" }
  ];

  const beneficios = [
    {
      icon: Gift,
      title: "100% Gratuito",
      description: "Sem taxas, sem surpresas. Conteúdo de valor real sem custo algum."
    },
    {
      icon: Video,
      title: "Vídeos Exclusivos",
      description: "Tutoriais profundos e demonstrações práticas que você não encontra em outro lugar."
    },
    {
      icon: FileText,
      title: "Pack de 20 Prompts",
      description: "Prompts prontos para automações que economizam horas do seu dia."
    },
    {
      icon: Lightbulb,
      title: "Insights Diários",
      description: "Dicas, casos de uso e estratégias testadas na prática."
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
              Grupo crescendo a cada dia 🔥
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Laboratório de{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Agentes de IA
            </span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground mb-6 leading-relaxed">
            Empresários estão usando IA para tarefas reais.
            <span className="text-primary font-medium"> Junte-se ao grupo que mais cresce!</span>
          </p>

          {/* Botão WhatsApp - DESTAQUE MÁXIMO */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full max-w-md mx-auto px-8 py-5 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-8 animate-[pulse_3s_ease-in-out_infinite]"
          >
            <MessageCircle className="w-6 h-6" />
            ENTRAR NO GRUPO VIP GRATUITO
            <ArrowRight className="w-6 h-6" />
          </a>

          {/* Micro-prova social */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>Comunidade ativa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>Conteúdo semanal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gift className="w-4 h-4" />
              <span>100% gratuito</span>
            </div>
          </div>

          {/* Mensagem do Anúncio */}
          <Card className="bg-gradient-card border-border shadow-card mb-8 max-w-2xl mx-auto">
            <CardContent className="p-5 md:p-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                    <strong className="text-foreground">Empresários estão usando agentes de IA para:</strong>
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs md:text-sm text-muted-foreground mb-3">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      Pesquisar concorrentes
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      Analisar dados
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      Criar relatórios
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                      Gerar propostas
                    </li>
                  </ul>
                  <p className="text-sm md:text-base text-foreground font-medium">
                    Mostro exemplos reais no laboratório.
                    <span className="text-primary ml-1">Quem entra recebe 20 prompts de automação!</span>
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

        {/* Preview dos 20 Prompts */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <Badge variant="secondary" className="mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              Bônus de Entrada
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Pack <span className="text-primary">APEX7AI LYNX</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4 mb-2">
              <strong className="text-foreground">20 PROMPTS DE AUTOMAÇÃO</strong>
            </p>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto px-4">
              Para Empresários Digitais — Exemplos reais de tarefas executadas por agentes de IA
            </p>
          </div>

          {/* Blocos de Prompts */}
          <div className="space-y-8 md:space-y-10">
            {/* BLOCO 1 */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs md:text-sm">1</span>
                PESQUISA E ANÁLISE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {prompts.filter(p => p.block === "PESQUISA E ANÁLISE").map((prompt, index) => (
                  <div
                    key={index}
                    className="bg-gradient-card border border-border rounded-lg p-3 md:p-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="mb-2">
                      <span className="text-xs font-bold text-primary">#{index + 1}</span>
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1">{prompt.title}</h4>
                    <p className="text-xs text-muted-foreground">{prompt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOCO 2 */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs md:text-sm">2</span>
                DADOS E RELATÓRIOS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {prompts.filter(p => p.block === "DADOS E RELATÓRIOS").map((prompt, index) => (
                  <div
                    key={index}
                    className="bg-gradient-card border border-border rounded-lg p-3 md:p-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="mb-2">
                      <span className="text-xs font-bold text-primary">#{index + 5}</span>
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1">{prompt.title}</h4>
                    <p className="text-xs text-muted-foreground">{prompt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOCO 3 */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs md:text-sm">3</span>
                DOCUMENTOS E PROPOSTAS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {prompts.filter(p => p.block === "DOCUMENTOS E PROPOSTAS").map((prompt, index) => (
                  <div
                    key={index}
                    className="bg-gradient-card border border-border rounded-lg p-3 md:p-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="mb-2">
                      <span className="text-xs font-bold text-primary">#{index + 9}</span>
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1">{prompt.title}</h4>
                    <p className="text-xs text-muted-foreground">{prompt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOCO 4 */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs md:text-sm">4</span>
                PRODUTIVIDADE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {prompts.filter(p => p.block === "PRODUTIVIDADE").map((prompt, index) => (
                  <div
                    key={index}
                    className="bg-gradient-card border border-border rounded-lg p-3 md:p-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="mb-2">
                      <span className="text-xs font-bold text-primary">#{index + 13}</span>
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1">{prompt.title}</h4>
                    <p className="text-xs text-muted-foreground">{prompt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOCO 5 */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs md:text-sm">5</span>
                CONTEÚDO
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {prompts.filter(p => p.block === "CONTEÚDO").map((prompt, index) => (
                  <div
                    key={index}
                    className="bg-gradient-card border border-border rounded-lg p-3 md:p-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="mb-2">
                      <span className="text-xs font-bold text-primary">#{index + 16}</span>
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1">{prompt.title}</h4>
                    <p className="text-xs text-muted-foreground">{prompt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOCO 6 */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-primary mb-3 flex items-center gap-2">
                <span className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs md:text-sm">6</span>
                NEGÓCIOS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {prompts.filter(p => p.block === "NEGÓCIOS").map((prompt, index) => (
                  <div
                    key={index}
                    className="bg-gradient-card border border-border rounded-lg p-3 md:p-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="mb-2">
                      <span className="text-xs font-bold text-primary">#{index + 18}</span>
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1">{prompt.title}</h4>
                    <p className="text-xs text-muted-foreground">{prompt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dica de Ouro */}
          <Card className="mt-8 bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 mb-2">DICA DE OURO</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Embora estes prompts funcionem em IAs genéricas, utilizá-los na plataforma <strong className="text-primary">Apex7AI Lynx</strong> eleva a qualidade dos resultados a outro nível.
                    Nossos agentes têm contexto otimizado para negócios, garantindo respostas mais precisas, analíticas e prontas para o mundo real.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* O que você vai receber */}
        <Card className="bg-gradient-primary/5 border-primary/20 mb-12 md:mb-16">
          <CardContent className="p-6 md:p-10 md:p-12">
            <div className="text-center mb-6 md:mb-8">
              <Rocket className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                Por que entrar agora?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Acesso Imediato</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Entre agora e receba o pack de prompts instantaneamente.
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Grupo em Crescimento</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Cada dia mais empresários se juntam. Quanto antes entrar, mais valor você captura.
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <Gift className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-2">Conteúdo Gratuito</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Sem vendas, sem upsells. Apenas conteúdo de valor real para sua empresa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Final */}
        <div className="text-center pb-8">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full max-w-md mx-auto px-8 py-5 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-6 animate-[pulse_3s_ease-in-out_infinite]"
          >
            <MessageCircle className="w-6 h-6" />
            QUERO ENTRAR NO GRUPO AGORA
            <ArrowRight className="w-6 h-6" />
          </a>

          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            🎁 <strong>Gratuito</strong> • Sem spam • Cancele quando quiser
          </p>

          {/* Rodapé da Marca */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Oferecimento: <strong className="text-primary">Apex7AI Agent Lynx</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              O futuro da gestão inteligente e automação de processos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrupoVIP;
