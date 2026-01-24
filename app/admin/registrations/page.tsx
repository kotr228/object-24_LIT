import { requireAuth } from '@/lib/auth';
import { getAllRegistrations } from '@/actions/registrations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default async function RegistrationsPage() {
  await requireAuth();
  const registrations = await getAllRegistrations();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'default',
      reviewed: 'secondary',
      approved: 'default',
      rejected: 'destructive',
    };

    const labels: Record<string, string> = {
      pending: 'Очікується',
      reviewed: 'Переглянуто',
      approved: 'Затверджено',
      rejected: 'Відхилено',
    };

    return (
      <Badge variant={variants[status] || 'default'}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Заявки на навчання</CardTitle>
          <CardDescription>
            Переглядайте та керуйте заявками на вступ до ліцею
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Немає заявок
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>ПІБ дитини</TableHead>
                    <TableHead>Клас</TableHead>
                    <TableHead>Профіль</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Батьки</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="whitespace-nowrap">
                        {new Date(registration.createdAt).toLocaleDateString('uk-UA')}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {registration.childLastName} {registration.childFirstName} {registration.childMiddleName}
                      </TableCell>
                      <TableCell>{registration.targetGrade}</TableCell>
                      <TableCell>{registration.preferredProfile}</TableCell>
                      <TableCell>{registration.contactPhone}</TableCell>
                      <TableCell>{registration.parentNames}</TableCell>
                      <TableCell>{getStatusBadge(registration.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
