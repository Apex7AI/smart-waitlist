import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Database, 
  Globe, 
  Target, 
  TrendingUp, 
  Users, 
  FileText, 
  Zap,
  Building2,
  BarChart3,
  Mail,
  ShoppingCart,
  Briefcase,
  Code2,
  MessageSquare,
  Calendar
} from "lucide-react";

const PracticalExamples = () => {
  const examples = [
    {
      icon: Search,
      title: "Pesquisa de Fornecedores B2B",
      description: "Lynx realiza uma pesquisa abrangente em extensas redes para identificar os fornecedores mais adequados para suas necessidades específicas.",
      result: "147 fornecedores qualificados encontrados em 15 minutos",
      category: "Pesquisa",
      time: "15 min",
      difficulty: "Automático"
    },
    {
      icon: Building2,
      title: "Lista de Empresas YC W25",
      description: "Navegou com maestria no banco de dados YC para identificar todas as empresas B2B qualificadas, compilando em tabela estruturada.",
      result: "250+ startups categorizadas por setor e estágio",
      category: "Dados",
      time: "8 min",
      difficulty: "Automático"
    },
    {
      icon: Target,
      title: "Pesquisa de 20 Empresas de CRM",
      description: "Identificou as 20 principais empresas de CRM e compilou seus slogans e histórias da marca em uma visão abrangente do setor.",
      result: "Relatório completo com análise competitiva",
      category: "Análise",
      time: "12 min",
      difficulty: "Automático"
    },
    {
      icon: TrendingUp,
      title: "Análise de Tendências de Mercado",
      description: "Monitoramento contínuo de tendências, análise de concorrentes e identificação de oportunidades de negócio em tempo real.",
      result: "Dashboard interativo com insights acionáveis",
      category: "Inteligência",
      time: "Contínuo",
      difficulty: "Automático"
    },
    {
      icon: Users,
      title: "Qualificação de Leads",
      description: "Análise automática de prospects, scoring de leads e criação de listas qualificadas para equipes de vendas.",
      result: "300+ leads qualificados e categorizados",
      category: "Vendas",
      time: "5 min",
      difficulty: "Automático"
    },
    {
      icon: FileText,
      title: "Criação de Propostas",
      description: "Geração automática de propostas comerciais personalizadas baseadas no perfil do cliente e histórico de interações.",
      result: "Propostas personalizadas em segundos",
      category: "Documentos",
      time: "2 min",
      difficulty: "Automático"
    },
    {
      icon: Code2,
      title: "Automação DevOps",
      description: "Execução de comandos no terminal, deploy automático, monitoramento de sistemas e resolução de problemas de infraestrutura.",
      result: "99.9% de uptime com resolução automática",
      category: "Técnico",
      time: "24/7",
      difficulty: "Automático"
    },
    {
      icon: Mail,
      title: "Campanhas de Email Marketing",
      description: "Criação, personalização e envio de campanhas segmentadas com análise de performance em tempo real.",
      result: "45% de aumento na taxa de conversão",
      category: "Marketing",
      time: "10 min",
      difficulty: "Automático"
    },
    {
      icon: BarChart3,
      title: "Relatórios Executivos",
      description: "Consolidação automática de dados de múltiplas fontes em relatórios executivos com insights e recomendações.",
      result: "Relatórios completos com 20+ métricas",
      category: "Gestão",
      time: "3 min",
      difficulty: "Automático"
    },
    {
      icon: ShoppingCart,
      title: "Análise de E-commerce",
      description: "Monitoramento de preços, análise de concorrentes, otimização de produtos e estratégias de precificação.",
      result: "15% de aumento nas vendas online",
      category: "E-commerce",
      time: "Contínuo",
      difficulty: "Automático"
    },
    {
      icon: MessageSquare,
      title: "Atendimento ao Cliente IA",
      description: "Resposta automática a dúvidas, resolução de problemas técnicos e escalamento inteligente para humanos.",
      result: "85% de resolução automática",
      category: "Suporte",
      time: "Instantâneo",
      difficulty: "Automático"
    },
    {
      icon: Calendar,
      title: "Agendamento Inteligente",
      description: "Coordenação automática de reuniões, follow-ups e lembretes personalizados baseados no comportamento do cliente.",
      result: "70% mais reuniões agendadas",
      category: "Produtividade",
      time: "Instantâneo",
      difficulty: "Automático"
    }
  ];

  const categories = [
    "Todos", "Pesquisa", "Dados", "Análise", "Inteligência", 
    "Vendas", "Marketing", "Técnico", "Gestão", "E-commerce", "Suporte", "Produtividade"
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  const filteredExamples = selectedCategory === "Todos" 
    ? examples 
    : examples.filter(example => example.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-background py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Veja o{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Poder em Ação
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Exemplos reais de como nossos agentes IA estão revolucionando empresas. 
            Cada caso mostra resultados concretos e mensuráveis.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`cursor-pointer px-4 py-2 text-sm transition-all duration-200 ${
                selectedCategory === category 
                  ? "bg-gradient-primary text-white shadow-glow" 
                  : "hover:bg-accent"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExamples.map((example, index) => {
            const IconComponent = example.icon;
            return (
              <Card 
                key={index} 
                className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer transform hover:scale-105"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-gradient-primary rounded-xl">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-xs">
                        {example.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {example.time}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {example.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {example.description}
                  </CardDescription>
                  
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-success">Resultado</span>
                    </div>
                    <p className="text-sm text-foreground">
                      {example.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-card rounded-2xl border border-border">
          <h3 className="text-2xl font-bold mb-4">
            Pronto para criar seus próprios agentes?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Estes são apenas alguns exemplos. Nossa plataforma permite criar agentes 
            personalizados para qualquer processo do seu negócio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Database className="w-4 h-4 mr-2" />
              Integração com 100+ APIs
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Automação Web Completa
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Code2 className="w-4 h-4 mr-2" />
              Controle de Sistema
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalExamples;