import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const programSchema = z.object({
  program: z.string({
    required_error: "Por favor seleccione una carrera",
  }),
});

const PROGRAMS = [
  'ADMINISTRACIÓN DE EMPRESAS',
  'BACTERIOLOGÍA',
  'CONTADURÍA PÚBLICA',
  'DERECHO',
  'ENFERMERÍA',
  'INGENIERÍA DE SISTEMAS',
  'INSTRUMENTACIÓN QUIRÚRGICA',
  'LICENCIATURA EN EDUCACIÓN INFANTIL',
  'MEDICINA',
  'ODONTOLOGÍA',
  'TECNOLOGÍA EN ATENCIÓN PREHOSPITALARIA',
  'TECNOLOGÍA EN ESTÉTICA Y COSMETOLOGÍA',
  'TECNOLOGÍA EN MECÁNICA DENTAL',
  'TRABAJO SOCIAL',
];

export function ProgramSelection({ onSubmit }: { onSubmit: (data: any) => void }) {
  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Selección de Programa</h2>
          <p className="text-gray-600">
            Seleccione la carrera en la que desea inscribirse
          </p>
        </div>

        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carrera *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Seleccione una carrera" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PROGRAMS.map((program) => (
                    <SelectItem key={program} value={program}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Continuar
          </Button>
        </div>
      </form>
    </Form>
  );
}