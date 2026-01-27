'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  position: string;
  specialization: string;
  photo: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  cardColor: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const initials = `${teacher.firstName.charAt(0)}${teacher.lastName.charAt(0)}`;
  const cardColor = teacher.cardColor || '#3b82f6';

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300"
      style={{ borderTop: `4px solid ${cardColor}` }}
    >
      <CardHeader>
        <Link href={`/teachers/${teacher.id}`} className="block">
          <div className="flex items-start gap-4 mb-4">
            {teacher.photo ? (
              <div
                className="relative w-20 h-20 rounded-full overflow-hidden"
                style={{ boxShadow: `0 0 0 4px ${cardColor}20` }}
              >
                <Image
                  src={teacher.photo}
                  alt={`${teacher.firstName} ${teacher.lastName}`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: cardColor }}
              >
                {initials}
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                {teacher.firstName} {teacher.lastName}
              </CardTitle>
              {teacher.middleName && (
                <p className="text-sm text-muted-foreground">{teacher.middleName}</p>
              )}
            </div>
          </div>
        </Link>
        <div
          className="rounded-lg px-3 py-2 mb-2"
          style={{ backgroundColor: `${cardColor}15` }}
        >
          <p className="text-sm font-semibold" style={{ color: cardColor }}>
            {teacher.position}
          </p>
        </div>
        <CardDescription className="text-sm">{teacher.specialization}</CardDescription>
      </CardHeader>
      <CardContent>
        {teacher.bio && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{teacher.bio}</p>
        )}
        <div className="space-y-2 text-sm">
          {teacher.email && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${teacher.email}`}
                className="hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                {teacher.email}
              </a>
            </div>
          )}
          {teacher.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a
                href={`tel:${teacher.phone}`}
                className="hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                {teacher.phone}
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
