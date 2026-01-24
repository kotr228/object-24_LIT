'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationFormData } from '@/lib/validations/registration';
import { createRegistration } from '@/actions/registrations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, UserPlus } from 'lucide-react';

const profileOptions = [
  { value: 'IT профіль 7-8 клас', label: 'IT профіль 7-8 клас', grade: [7, 8] },
  { value: 'IT профіль 9 клас', label: 'IT профіль 9 клас', grade: [9] },
  { value: 'IT профіль 10 клас', label: 'IT профіль 10 клас', grade: [10] },
];

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<number>(7);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      childFirstName: '',
      childLastName: '',
      childMiddleName: '',
      childBirthDate: '',
      currentSchool: '',
      targetGrade: 7,
      preferredProfile: '',
      homeAddress: '',
      contactPhone: '',
      parentNames: '',
    },
  });

  const availableProfiles = profileOptions.filter((option) =>
    option.grade.includes(selectedGrade)
  );

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    try {
      const result = await createRegistration(data);
      if (result.success) {
        toast.success(result.message);
        reset();
        setSelectedGrade(7);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Сталася помилка при поданні заявки');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm mb-4 dark:bg-gray-800">
            <UserPlus className="mr-2 h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Вступ до ліцею</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Реєстрація на навчання
          </h1>
          <p className="text-lg text-muted-foreground">
            Заповніть форму нижче для подання заявки на навчання в Олександрійському ліцеї інформаційних технологій
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Форма реєстрації</CardTitle>
            <CardDescription>
              Будь ласка, вкажіть всю необхідну інформацію. Поля позначені * є обов'язковими.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Child Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Інформація про дитину</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="childLastName">Прізвище *</Label>
                    <Input id="childLastName" {...register('childLastName')} />
                    {errors.childLastName && (
                      <p className="text-sm text-destructive">{errors.childLastName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="childFirstName">Ім'я *</Label>
                    <Input id="childFirstName" {...register('childFirstName')} />
                    {errors.childFirstName && (
                      <p className="text-sm text-destructive">{errors.childFirstName.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="childMiddleName">По батькові</Label>
                  <Input id="childMiddleName" {...register('childMiddleName')} />
                  {errors.childMiddleName && (
                    <p className="text-sm text-destructive">{errors.childMiddleName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="childBirthDate">Дата народження дитини *</Label>
                  <Input id="childBirthDate" type="date" {...register('childBirthDate')} />
                  {errors.childBirthDate && (
                    <p className="text-sm text-destructive">{errors.childBirthDate.message}</p>
                  )}
                </div>
              </div>

              {/* School Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Інформація про навчання</h3>

                <div className="space-y-2">
                  <Label htmlFor="currentSchool">До якої школи піде дитина *</Label>
                  <Input
                    id="currentSchool"
                    {...register('currentSchool')}
                    placeholder="Наприклад: ЗОШ №1 м. Олександрія"
                  />
                  {errors.currentSchool && (
                    <p className="text-sm text-destructive">{errors.currentSchool.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetGrade">У який клас піде дитина *</Label>
                  <select
                    id="targetGrade"
                    {...register('targetGrade', {
                      valueAsNumber: true,
                      onChange: (e) => {
                        const grade = parseInt(e.target.value);
                        setSelectedGrade(grade);
                        setValue('preferredProfile', '');
                      }
                    })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="7">7 клас</option>
                    <option value="8">8 клас</option>
                    <option value="9">9 клас</option>
                    <option value="10">10 клас</option>
                  </select>
                  {errors.targetGrade && (
                    <p className="text-sm text-destructive">{errors.targetGrade.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Бажаний профіль *</Label>
                  {availableProfiles.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={option.value}
                        value={option.value}
                        {...register('preferredProfile')}
                        className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                      />
                      <Label htmlFor={option.value} className="cursor-pointer font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                  {errors.preferredProfile && (
                    <p className="text-sm text-destructive">{errors.preferredProfile.message}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Контактна інформація</h3>

                <div className="space-y-2">
                  <Label htmlFor="homeAddress">Домашня адреса *</Label>
                  <Input
                    id="homeAddress"
                    {...register('homeAddress')}
                    placeholder="Вулиця, будинок, квартира, місто"
                  />
                  {errors.homeAddress && (
                    <p className="text-sm text-destructive">{errors.homeAddress.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Контактний телефон *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    {...register('contactPhone')}
                    placeholder="+38 (0XX) XXX-XX-XX"
                  />
                  {errors.contactPhone && (
                    <p className="text-sm text-destructive">{errors.contactPhone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentNames">ПІБ батьків/опікунів *</Label>
                  <Input
                    id="parentNames"
                    {...register('parentNames')}
                    placeholder="Прізвище Ім'я По батькові"
                  />
                  {errors.parentNames && (
                    <p className="text-sm text-destructive">{errors.parentNames.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Подати заявку
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
