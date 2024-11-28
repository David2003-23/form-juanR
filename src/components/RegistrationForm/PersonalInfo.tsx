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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  secondName: z.string().optional(),
  firstLastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  secondLastName: z.string().optional(),
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
  documentType: z.string().min(1, 'El tipo de documento es requerido'),
  documentNumber: z.string().min(5, 'Número de documento inválido'),
  civilStatus: z.string().min(1, 'El estado civil es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().min(7, 'Teléfono inválido'),
  mobile: z.string().min(10, 'Celular inválido'),
  country: z.string().min(1, 'El país es requerido'),
  city: z.string().min(1, 'La ciudad es requerida'),
  address: z.string().min(1, 'La dirección es requerida'),
});

export function PersonalInfo({ onSubmit, onBack }: { onSubmit: (data: any) => void; onBack: () => void }) {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      secondName: '',
      firstLastName: '',
      secondLastName: '',
      birthDate: '',
      documentType: 'cc',
      documentNumber: '',
      civilStatus: 'soltero',
      email: '',
      phone: '',
      mobile: '',
      country: '',
      city: '',
      address: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Información Personal</h2>
          <p className="text-gray-600">
            Por favor complete sus datos personales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primer Nombre *</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="secondName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segundo Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Carlos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primer Apellido *</FormLabel>
                <FormControl>
                  <Input placeholder="Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segundo Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Gómez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Documento *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione tipo de documento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                    <SelectItem value="ti">Tarjeta de Identidad</SelectItem>
                    <SelectItem value="pasaporte">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Documento *</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="civilStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione estado civil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero/a</SelectItem>
                    <SelectItem value="casado">Casado/a</SelectItem>
                    <SelectItem value="divorciado">Divorciado/a</SelectItem>
                    <SelectItem value="viudo">Viudo/a</SelectItem>
                    <SelectItem value="union_libre">Unión Libre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono Fijo *</FormLabel>
                <FormControl>
                  <Input placeholder="6017654321" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular *</FormLabel>
                <FormControl>
                  <Input placeholder="3001234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País *</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Colombia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad *</FormLabel>
                <FormControl>
                  <Input placeholder="Bogotá" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Dirección *</FormLabel>
                <FormControl>
                  <Input placeholder="Calle 123 # 45-67" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Atrás
          </Button>
          <Button type="submit" size="lg">
            Continuar
          </Button>
        </div>
      </form>
    </Form>
  );
}