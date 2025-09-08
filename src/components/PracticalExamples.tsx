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
      icon: Code2,
      title: "Construtor de Sites com IA",
      description: "Descreva sua ideia e o Lynx gera automaticamente código HTML/CSS funcional com design responsivo e conteúdo pronto para publicação.",
      result: "Sites profissionais em 5-10 minutos",
      category: "Criação",
      time: "5-10 min",
      difficulty: "Fácil"
    },
    {
      icon: TrendingUp,
      title: "Análise de Investimentos",
      description: "Compare histórico de empresas, analise demonstrativos financeiros e crie relatórios detalhados com insights acionáveis.",
      result: "Decisões de investimento 3x mais assertivas",
      category: "Finanças",
      time: "15-20 min",
      difficulty: "Avançado"
    },
    {
      icon: FileText,
      title: "Gerador de Vídeos com IA",
      description: "Transforme roteiros em vídeos editados com narração, legendas e imagens automáticas — exportado em MP4 ou link de visualização.",
      result: "Conteúdo profissional sem equipe de produção",
      category: "Criação",
      time: "10-15 min",
      difficulty: "Intermediário"
    },
    {
      icon: Search,
      title: "Pesquisa de Mercado Automatizada",
      description: "Coleta dados de concorrentes, preços, tendências e demanda em setores específicos, e gera relatório com insights acionáveis.",
      result: "Identificação de 5 oportunidades de mercado",
      category: "Pesquisa",
      time: "20-30 min",
      difficulty: "Avançado"
    },
    {
      icon: Users,
      title: "Análise de Candidatos a CEO",
      description: "Pesquisa histórico profissional, analisa liderança e cria painéis com recomendações estratégicas para seleção executiva.",
      result: "Processo de seleção 80% mais eficiente",
      category: "RH",
      time: "25-35 min",
      difficulty: "Avançado"
    },
    {
      icon: MessageSquare,
      title: "Localizador de Influenciadores YouTube", 
      description: "Busca criadores por nicho, engajamento e localização, extrai dados de canal e organiza os melhores perfis em tabela.",
      result: "Campanhas com 300% mais alcance",
      category: "Marketing",
      time: "10-15 min",
      difficulty: "Intermediário"
    },
    {
      icon: FileText,
      title: "Gerador de Slides com IA",
      description: "Insira um tema, relatório ou documento, e o Lynx cria apresentação completa em PowerPoint ou PDF com design coeso.",
      result: "Apresentações impactantes em minutos",
      category: "Criação",
      time: "5-8 min",
      difficulty: "Fácil"
    },
    {
      icon: Target,
      title: "Verificador de Fatos",
      description: "Pesquisa fontes confiáveis, compara dados e contextos, e gera relatório com grau de veracidade e links para evidências.",
      result: "100% de precisão em verificações",
      category: "Pesquisa",
      time: "5-10 min",
      difficulty: "Intermediário"
    },
    {
      icon: Globe,
      title: "Pesquisa Histórica + Site",
      description: "Pesquise a história de Albert Einstein e crie um site completo para apresentar, com visualizações e timeline interativo.",
      result: "Conteúdo educacional rico e envolvente",
      category: "Educação",
      time: "20-30 min",
      difficulty: "Avançado"
    },
    {
      icon: Briefcase,
      title: "Construtor de Canvas de Negócios",
      description: "Recebe descrição do produto e preenche automaticamente as nove áreas do Business Model Canvas em formato digital.",
      result: "Estratégia de negócio clara e estruturada",
      category: "Negócios",
      time: "8-12 min",
      difficulty: "Intermediário"
    },
    {
      icon: Code2,
      title: "Gerador de Extensões Chrome",
      description: "Descreva a funcionalidade desejada e gere código completo da extensão testável no navegador Chrome.",
      result: "Ferramentas personalizadas sem programação",
      category: "Desenvolvimento",
      time: "15-25 min",
      difficulty: "Avançado"
    },
    {
      icon: BarChart3,
      title: "Análise SWOT Automatizada",
      description: "Pesquisa empresa/setor e produz análise SWOT estruturada com dados reais, não genérica, incluindo insights competitivos.",
      result: "Estratégias competitivas mais assertivas",
      category: "Estratégia",
      time: "15-20 min",
      difficulty: "Intermediário"
    }
  ];

  const categories = [
    "Todos", "Criação", "Finanças", "Pesquisa", "RH", "Marketing", 
    "Educação", "Negócios", "Desenvolvimento", "Estratégia"
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
            Execute Tarefas{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Complexas
            </span>{" "}
            de Forma Autônoma
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Não é apenas um chat. É um agente de IA que pesquisa, analisa, cria e executa tarefas reais no seu lugar. 
            <span className="text-primary font-medium"> Controle total do navegador, análises profundas e criação de conteúdo independente.</span>
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
          <h3 className="text-2xl font-bold mb-6">
            Dois Caminhos, Uma Revolução
          </h3>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            <span className="text-primary font-medium">Para Você:</span> Use diretamente nossa plataforma para executar tarefas complexas. 
            <span className="text-primary font-medium ml-4">Para Sua Empresa:</span> Construa, gerencie e treine sua força de trabalho de IA.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center p-6 bg-gradient-primary/10 rounded-lg border border-primary/20">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-3">Uso Individual</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Acesse nossa plataforma e execute tarefas como pesquisa profunda, criação de conteúdo, análises complexas e automações.
              </p>
              <ul className="text-xs text-left space-y-1 text-muted-foreground">
                <li>• Controle total do navegador</li>
                <li>• Pesquisa e análise profunda</li>
                <li>• Criação de sites, vídeos e apresentações</li>
                <li>• Verificação de fatos e dados</li>
              </ul>
            </div>
            <div className="text-center p-6 bg-gradient-primary/5 rounded-lg border border-border">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-3">Implementação Empresarial</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Construa, gerencie e treine sua força de trabalho artificial. Agentes especializados para cada departamento.
              </p>
              <ul className="text-xs text-left space-y-1 text-muted-foreground">
                <li>• Integração com sistemas existentes</li>
                <li>• Agentes personalizados por setor</li>
                <li>• Automação de processos complexos</li>
                <li>• Suporte e treinamento dedicado</li>
              </ul>
            </div>
          </div>
          
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