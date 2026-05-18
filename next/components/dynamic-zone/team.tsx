'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const Team = ({
  title,
  subtitle,
  teams = [],
  locale,
}: {
  title?: string;
  subtitle?: string;
  teams: any[];
  locale: string;
}) => {
  return (
    <Container className="py-24">
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <Heading as="h2" size="xl">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Subheading className="mx-auto mt-4 max-w-2xl">
              {subtitle}
            </Subheading>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((member) => {
          const imageUrl = member.image?.[0]?.url?.startsWith('http')
            ? member.image[0].url
            : member.image?.[0]?.url
              ? `${API_URL}${member.image[0].url}`
              : null;

          return (
            <div
              key={member.id}
              className="flex flex-col items-center rounded-2xl border border-[#E2E2E2] bg-white p-6 text-center shadow-sm"
            >
              {imageUrl && (
                <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-[#2B2B2B]">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-[#666666]">{member.role}</p>
              {(member.linkedin || member.creedly) && (
                <div className="mt-4 flex gap-3">
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      className="text-xs text-[#00AEEF] hover:underline"
                    >
                      LinkedIn
                    </Link>
                  )}
                  {member.creedly && (
                    <Link
                      href={member.creedly}
                      target="_blank"
                      className="text-xs text-[#00AEEF] hover:underline"
                    >
                      Creedly
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
};