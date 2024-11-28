import { useState } from 'react';
import { toast } from 'sonner';
import { PersonalInfo } from './PersonalInfo';
import { ProgramSelection } from './ProgramSelection';
import { SurveyInfo } from './SurveyInfo';
import { cn } from '@/lib/utils';

type FormStep = 'program' | 'personal' | 'survey';

export function RegistrationForm() {
  const [step, setStep] = useState<FormStep>('program');
  const [formData, setFormData] = useState({});

  const handleStepSubmit = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    
    if (step === 'program') setStep('personal');
    else if (step === 'personal') setStep('survey');
    else {
      toast.success('¡Formulario enviado con éxito!');
      console.log('Form submitted:', { ...formData, ...data });
    }
  };

  const handleBack = () => {
    if (step === 'personal') setStep('program');
    else if (step === 'survey') setStep('personal');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <Step number={1} title="Programa" active={step === 'program'} completed={step !== 'program'} />
          <Step number={2} title="Datos Personales" active={step === 'personal'} completed={step === 'survey'} />
          <Step number={3} title="Encuesta" active={step === 'survey'} completed={false} />
        </div>
      </div>

      <div className="transition-all duration-300">
        {step === 'program' && <ProgramSelection onSubmit={handleStepSubmit} />}
        {step === 'personal' && <PersonalInfo onSubmit={handleStepSubmit} onBack={handleBack} />}
        {step === 'survey' && <SurveyInfo onSubmit={handleStepSubmit} onBack={handleBack} />}
      </div>
    </div>
  );
}

function Step({ number, title, active, completed }: { 
  number: number; 
  title: string; 
  active: boolean; 
  completed: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2 transition-colors",
        active && "bg-indigo-600 text-white",
        completed && "bg-green-500 text-white",
        !active && !completed && "bg-gray-200 text-gray-600"
      )}>
        {number}
      </div>
      <span className={cn(
        "text-sm font-medium",
        active && "text-indigo-600",
        completed && "text-green-500",
        !active && !completed && "text-gray-500"
      )}>
        {title}
      </span>
    </div>
  );
}