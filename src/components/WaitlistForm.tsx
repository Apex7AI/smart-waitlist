import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  useCases: string[];
  customUseCase: string;
  urgency: string;
  budget: string;
}

const WaitlistForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    useCases: [],
    customUseCase: "",
    urgency: "",
    budget: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const useCaseOptions = [
    "Atendimento ao cliente",
    "Automação de processos internos",
    "Análise e relatórios de dados",
    "Integração com CRM ou ferramentas existentes",
    "Criação de conteúdo / marketing",
    "Outro"
  ];

  const handleUseCaseChange = (useCase: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        useCases: [...prev.useCases, useCase]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        useCases: prev.useCases.filter(u => u !== useCase)
      }));
    }
  };

  const calculateScore = (data: FormData) => {
    let score = 0;
    
    // Urgency scoring
    if (data.urgency === "immediate") score += 5;
    else if (data.urgency === "medium") score += 3;
    else if (data.urgency === "future") score += 1;

    // Budget scoring
    if (data.budget === "200+") score += 5;
    else if (data.budget === "50-200") score += 4;
    else if (data.budget === "20-50") score += 2;
    else if (data.budget === "under-20") score += 1;

    // Use cases scoring (multiple use cases = higher engagement)
    score += Math.min(data.useCases.length, 3);

    // Company field filled
    if (data.company) score += 1;

    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore(formData);
    
    // Here you would normally save to database
    console.log("Lead Score:", score);
    console.log("Form Data:", formData);
    
    setIsSubmitted(true);
    
    let priorityMessage = "";
    if (score >= 10) priorityMessage = "Você está no topo da nossa lista! Entraremos em contato em breve.";
    else if (score >= 7) priorityMessage = "Você tem alta prioridade na nossa lista de espera.";
    else if (score >= 4) priorityMessage = "Você foi adicionado à nossa lista de espera prioritária.";
    else priorityMessage = "Obrigado por se inscrever! Manteremos você informado sobre nosso lançamento.";

    toast({
      title: "Inscrição realizada com sucesso!",
      description: priorityMessage,
    });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gradient-card border-border shadow-card">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Bem-vindo à lista de espera!</h3>
          <p className="text-muted-foreground mb-4">
            Obrigado pelo seu interesse. Analisaremos suas respostas e entraremos em contato em breve.
          </p>
          <div className="bg-gradient-hero p-4 rounded-lg border border-border">
            <p className="text-sm">
              💡 <strong>Próximos passos:</strong> Fique atento ao seu e-mail para atualizações exclusivas 
              e convites para testes beta baseados no seu perfil.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Passo {step} de {totalSteps}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">
            {step === 1 && "Vamos nos conhecer"}
            {step === 2 && "Como você pretende usar nossa IA?"}
            {step === 3 && "Qual a urgência?"}
            {step === 4 && "Investimento estimado"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Precisamos de algumas informações básicas sobre você"}
            {step === 2 && "Nos ajude a entender seus casos de uso"}
            {step === 3 && "Queremos priorizar quem tem mais urgência"}
            {step === 4 && "Para dimensionar melhor nossa solução"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Seu cargo/função"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-3">
                {useCaseOptions.map((useCase) => (
                  <div key={useCase} className="flex items-center space-x-2">
                    <Checkbox
                      id={useCase}
                      checked={formData.useCases.includes(useCase)}
                      onCheckedChange={(checked) => handleUseCaseChange(useCase, checked as boolean)}
                    />
                    <Label
                      htmlFor={useCase}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {useCase}
                    </Label>
                  </div>
                ))}
              </div>
              
              {formData.useCases.includes("Outro") && (
                <div className="space-y-2">
                  <Label htmlFor="customUseCase">Descreva seu caso de uso:</Label>
                  <Textarea
                    id="customUseCase"
                    value={formData.customUseCase}
                    onChange={(e) => setFormData(prev => ({ ...prev, customUseCase: e.target.value }))}
                    placeholder="Descreva como pretende usar nossa IA..."
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <RadioGroup
              value={formData.urgency}
              onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="immediate" />
                <Label htmlFor="immediate">Imediato (este trimestre)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Médio prazo (3–6 meses)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="future" id="future" />
                <Label htmlFor="future">Futuro (apenas explorando por enquanto)</Label>
              </div>
            </RadioGroup>
          )}

          {step === 4 && (
            <RadioGroup
              value={formData.budget}
              onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="under-20" id="under-20" />
                <Label htmlFor="under-20">Até $20/mês</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20-50" id="20-50" />
                <Label htmlFor="20-50">Até $50/mês</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="50-200" id="50-200" />
                <Label htmlFor="50-200">Até $200/mês</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="200+" id="200+" />
                <Label htmlFor="200+">Mais de $200/mês</Label>
              </div>
            </RadioGroup>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className="min-w-[100px]"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>

            {step === totalSteps ? (
              <Button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.urgency || !formData.budget}
                className="min-w-[140px] bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Finalizar Inscrição
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.name || !formData.email)) ||
                  (step === 2 && formData.useCases.length === 0) ||
                  (step === 3 && !formData.urgency)
                }
                className="min-w-[100px] bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                Próximo
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitlistForm;