import { Toaster } from '@/components/ui/sonner';
import { RegistrationForm } from '@/components/RegistrationForm';
import { GraduationCap } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <GraduationCap className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Inscripción Universitaria
          </h1>
          <p className="text-lg text-gray-600">
            Completa el formulario para iniciar tu futuro académico
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <RegistrationForm />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;