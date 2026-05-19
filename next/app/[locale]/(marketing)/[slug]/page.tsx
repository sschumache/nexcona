import { Metadata } from 'next';

import ClientSlugHandler from '../ClientSlugHandler';
import PageContent from '@/lib/shared/PageContent';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { fetchCollectionType } from '@/lib/strapi';
import type { LocaleSlugParamsProps } from '@/types/types';

const pagePopulate = {
  seo: true,
  dynamic_zone: {
    on: {
      'dynamic-zone.hero': true,
      'dynamic-zone.features': { populate: '*' },
      'dynamic-zone.testimonials': { populate: { testimonials: { populate: { user: { populate: { image: true } } } } } },
      'dynamic-zone.how-it-works': { populate: { steps: true } },
      'dynamic-zone.brands': { populate: { logos: { populate: { image: true } } } },
      'dynamic-zone.pricing': { populate: { plans: { populate: '*' } } },
      'dynamic-zone.launches': { populate: { launches: true } },
      'dynamic-zone.cta': { populate: { CTAs: true } },
      'dynamic-zone.faq': { populate: { faqs: true } },
      'dynamic-zone.form-next-to-section': { populate: '*' },
      'dynamic-zone.team': { populate: { teams: { populate: { image: true } } } },
    },
  },
};

export async function generateMetadata({
  params,
}: LocaleSlugParamsProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: slug }, locale },
    populate: pagePopulate,
  });

  if (!pageData) return {};
  return generateMetadataObject(pageData.seo);
}

export default async function Page({ params }: LocaleSlugParamsProps) {
  const { slug, locale } = await params;

  const [pageData] = await fetchCollectionType('pages', {
    filters: { slug: { $eq: slug }, locale },
    populate: pagePopulate,
  });

  if (!pageData) return null;

  const localizedSlugs = pageData.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = localization.slug;
      return acc;
    },
    { [locale]: slug }
  );

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <PageContent pageData={pageData} locale={locale} />
    </>
  );
}