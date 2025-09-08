import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Download, 
  Copy,
  Building2,
  Star,
  AlertCircle
} from "lucide-react";

interface WaitlistLead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  use_cases: string[];
  custom_use_case: string | null;
  urgency: string;
  budget: string;
  lead_score: number;
  status: string | null;
  priority_level: string | null;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [leads, setLeads] = useState<WaitlistLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
    avgScore: 0,
    companies: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados do dashboard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (leadsData: WaitlistLead[]) => {
    const total = leadsData.length;
    const highPriority = leadsData.filter(lead => lead.lead_score >= 8).length;
    const mediumPriority = leadsData.filter(lead => lead.lead_score >= 5 && lead.lead_score < 8).length;
    const lowPriority = leadsData.filter(lead => lead.lead_score < 5).length;
    const avgScore = total > 0 ? leadsData.reduce((sum, lead) => sum + lead.lead_score, 0) / total : 0;
    const companies = leadsData.filter(lead => lead.company && lead.company.trim() !== '').length;

    setStats({
      total,
      highPriority,
      mediumPriority,
      lowPriority,
      avgScore: Math.round(avgScore * 10) / 10,
      companies
    });
  };

  const getPriorityBadge = (score: number) => {
    if (score >= 8) {
      return <Badge className="bg-gradient-primary text-white">Alta Prioridade</Badge>;
    } else if (score >= 5) {
      return <Badge variant="secondary">Média Prioridade</Badge>;
    } else {
      return <Badge variant="outline">Baixa Prioridade</Badge>;
    }
  };

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'Mais de R$ 10.000/mês': return 'text-green-400';
      case 'R$ 5.000 - R$ 10.000/mês': return 'text-blue-400';
      case 'R$ 1.000 - R$ 5.000/mês': return 'text-yellow-400';
      default: return 'text-muted-foreground';
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Nome', 'Email', 'Empresa', 'Cargo', 'Score', 'Orçamento', 
      'Urgência', 'Casos de Uso', 'Data de Cadastro'
    ];
    
    const csvData = leads.map(lead => [
      lead.name,
      lead.email,
      lead.company || '',
      lead.role || '',
      lead.lead_score,
      lead.budget,
      lead.urgency,
      lead.use_cases.join('; '),
      new Date(lead.created_at).toLocaleDateString('pt-BR')
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `waitlist_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Exportação concluída",
      description: "Os dados foram exportados para CSV com sucesso.",
    });
  };

  const copyEmailList = () => {
    const emails = leads.map(lead => lead.email).join(', ');
    navigator.clipboard.writeText(emails);
    
    toast({
      title: "E-mails copiados",
      description: `${leads.length} e-mails copiados para a área de transferência.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard - Lista de Espera</h1>
          <p className="text-muted-foreground">
            Gerencie e analise os leads da sua lista de espera
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.companies} com empresa
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alta Prioridade</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{stats.highPriority}</div>
              <p className="text-xs text-muted-foreground">
                Score ≥ 8 pontos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgScore}</div>
              <p className="text-xs text-muted-foreground">
                De 12 pontos possíveis
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Empresas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.companies}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.companies / stats.total) * 100)}% do total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <Button onClick={exportToCSV} className="bg-gradient-primary">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button onClick={copyEmailList} variant="secondary">
            <Copy className="h-4 w-4 mr-2" />
            Copiar E-mails
          </Button>
        </div>

        {/* Data Table */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-card/50 mb-6">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="high">Alta</TabsTrigger>
            <TabsTrigger value="medium">Média</TabsTrigger>
            <TabsTrigger value="low">Baixa</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <LeadsTable leads={leads} getPriorityBadge={getPriorityBadge} getBudgetColor={getBudgetColor} />
          </TabsContent>
          
          <TabsContent value="high">
            <LeadsTable 
              leads={leads.filter(lead => lead.lead_score >= 8)} 
              getPriorityBadge={getPriorityBadge} 
              getBudgetColor={getBudgetColor} 
            />
          </TabsContent>
          
          <TabsContent value="medium">
            <LeadsTable 
              leads={leads.filter(lead => lead.lead_score >= 5 && lead.lead_score < 8)} 
              getPriorityBadge={getPriorityBadge} 
              getBudgetColor={getBudgetColor} 
            />
          </TabsContent>
          
          <TabsContent value="low">
            <LeadsTable 
              leads={leads.filter(lead => lead.lead_score < 5)} 
              getPriorityBadge={getPriorityBadge} 
              getBudgetColor={getBudgetColor} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const LeadsTable = ({ 
  leads, 
  getPriorityBadge, 
  getBudgetColor 
}: { 
  leads: WaitlistLead[], 
  getPriorityBadge: (score: number) => JSX.Element,
  getBudgetColor: (budget: string) => string
}) => (
  <Card className="bg-gradient-card border-border">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        Leads ({leads.length})
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome / E-mail</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Orçamento</TableHead>
              <TableHead>Urgência</TableHead>
              <TableHead>Casos de Uso</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                    {lead.role && (
                      <div className="text-xs text-muted-foreground">{lead.role}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {lead.company ? (
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {lead.company}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{lead.lead_score}/12</span>
                    {getPriorityBadge(lead.lead_score)}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={getBudgetColor(lead.budget)}>
                    {lead.budget}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {lead.urgency === 'Preciso implementar imediatamente' && (
                      <AlertCircle className="h-3 w-3 text-red-400" />
                    )}
                    {lead.urgency === 'Nos próximos 3 meses' && (
                      <Clock className="h-3 w-3 text-yellow-400" />
                    )}
                    <span className="text-sm">{lead.urgency}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <div className="flex flex-wrap gap-1 mb-1">
                      {lead.use_cases.slice(0, 2).map((useCase, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {useCase}
                        </Badge>
                      ))}
                      {lead.use_cases.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{lead.use_cases.length - 2}
                        </Badge>
                      )}
                    </div>
                    {lead.custom_use_case && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {lead.custom_use_case.substring(0, 50)}...
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;