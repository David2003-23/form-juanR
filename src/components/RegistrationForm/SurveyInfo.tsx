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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const surveySchema = z.object({
  children: z.string(),
  ethnicity: z.string(),
  disability: z.array(z.string()),
  otherDisability: z.string().optional(),
  employment: z.string(),
});

export function SurveyInfo({ onSubmit, onBack }: { onSubmit: (data: any) => void; onBack: () => void }) {
  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      children: '0',
      ethnicity: 'ninguna',
      disability: [],
      employment: 'no',
      otherDisability: '',
    },
  });

  const watchDisability = form.watch('disability');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Encuesta Personal</h2>
          <p className="text-gray-600">
            Esta información nos ayuda a conocerte mejor
          </p>
        </div>

        <FormField
          control={form.control}
          name="children"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>¿Tiene usted hijos?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No tengo
                    </FormLabel>
                  </FormItem>
                  {[1, 2, 3, 4].map((num) => (
                    <FormItem key={num} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={num.toString()} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {num} {num === 1 ? 'hijo' : 'hijos'}
                      </FormLabel>
                    </FormItem>
                  ))}
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5+" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Más de 4 hijos
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ethnicity"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>¿Se reconoce como parte de alguna de las siguientes poblaciones?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {[
                    { value: 'ninguna', label: 'Ninguna' },
                    { value: 'indigena', label: 'Indígenas' },
                    { value: 'afrocolombiano', label: 'Afrocolombianos' },
                    { value: 'raizal', label: 'Raizales' },
                    { value: 'rom', label: 'Pueblo ROM o Gitano' },
                  ].map((item) => (
                    <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={item.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disability"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>¿Cuenta con alguna discapacidad?</FormLabel>
              </div>
              {[
                { id: 'ninguna', label: 'Ninguna' },
                { id: 'motriz', label: 'Discapacidad motriz' },
                { id: 'sorda', label: 'Discapacidad sorda' },
                { id: 'cognitiva', label: 'Discapacidad cognitiva' },
                { id: 'sordoceguera', label: 'Sordoceguera' },
                { id: 'voz-habla', label: 'Trastorno de la voz y el habla' },
                { id: 'otra', label: 'Otra' },
              ].map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="disability"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        {watchDisability.includes('otra') && (
          <FormField
            control={form.control}
            name="otherDisability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es su otra discapacidad?</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Especifique su discapacidad" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="employment"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>¿Usted trabaja actualmente?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No estoy trabajando
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="empleado" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Sí, empleado
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="independiente" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Sí, independiente
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Atrás
          </Button>
          <Button type="submit" size="lg">
            Enviar Formulario
          </Button>
        </div>
      </form>
    </Form>
  );
}