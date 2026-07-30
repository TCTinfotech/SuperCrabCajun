import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND_NAME } from '../../utils/constants';

/**
 * SEOHead component to manage meta tags and Schema.org structured data dynamically per page.
 * @param {Object} props
 * @param {string} props.title - Title of the page
 * @param {string} props.description - Meta description
 * @param {string} props.canonicalUrl - Canonical URL of the page
 * @param {Object} [props.schema] - Optional custom JSON-LD schema object
 */
export default function SEOHead({ title, description, canonicalUrl, schema }) {
  const siteUrl = 'https://supercrabtx.com'; // Production site base URL
  const fullTitle = `${title} | ${BRAND_NAME} - Cajun Seafood Restaurant`;
  const defaultDesc = 'Super Crab TX serves the best cajun seafood boil, juicy crab legs, lobster tail, shrimp, and crawfish in Texas. Visit us or order online!';
  const metaDescription = description || defaultDesc;
  const pageUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const ogImage = `${siteUrl}/logo.jpg`;

  // Default Restaurant Schema
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    'name': BRAND_NAME,
    'image': ogImage,
    'url': siteUrl,
    'priceRange': '$$',
    'servesCuisine': 'Cajun Seafood, American',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '3506 Palmer Hwy',
      'addressLocality': 'Texas City',
      'addressRegion': 'TX',
      'postalCode': '77590',
      'addressCountry': 'US'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        'opens': '11:30',
        'closes': '22:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Friday', 'Saturday'],
        'opens': '11:30',
        'closes': '23:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Sunday'],
        'opens': '12:00',
        'closes': '21:00'
      }
    ]
  };

  const schemaToRender = schema || defaultSchema;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={BRAND_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaToRender)}
      </script>
    </Helmet>
  );
}
