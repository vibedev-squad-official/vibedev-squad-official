"use client";

import Script from 'next/script';

interface SEOStructuredDataProps {
  organizationName?: string;
  url?: string;
  description?: string;
  pricing?: {
    name: string;
    price: number;
    currency: string;
    billingPeriod: string;
  }[];
}

export function SEOStructuredData({
  organizationName = "Vibe DevSquad",
  url = "https://vibedevsquad.ai",
  description = "AI development agency replacement that provides automated development teams working 24/7 to scale your business.",
  pricing = [
    { name: "Starter", price: 497, currency: "USD", billingPeriod: "month" },
    { name: "Scale", price: 1497, currency: "USD", billingPeriod: "month" },
    { name: "Enterprise", price: 4997, currency: "USD", billingPeriod: "month" }
  ]
}: SEOStructuredDataProps) {
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationName,
    "url": url,
    "description": description,
    "logo": `${url}/logo.png`,
    "sameAs": [
      "https://twitter.com/vibedevsquad",
      "https://linkedin.com/company/vibedevsquad",
      "https://github.com/vibedevsquad"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-VIBE-DEV",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Development Team Services",
    "description": "Complete AI-powered development team replacement service with 24/7 automated coding, testing, and deployment.",
    "provider": {
      "@type": "Organization",
      "name": organizationName,
      "url": url
    },
    "serviceType": "Software Development",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Development Services",
      "itemListElement": pricing.map((plan, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `${plan.name} Plan`,
          "description": `AI development team ${plan.name.toLowerCase()} plan`
        },
        "price": plan.price,
        "priceCurrency": plan.currency,
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": plan.price,
          "priceCurrency": plan.currency,
          "billingPeriod": plan.billingPeriod
        },
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString(),
        "url": `${url}#pricing`
      }))
    }
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vibe DevSquad AI Platform",
    "description": "AI-powered development platform that replaces traditional development teams with automated agents",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "price": "497",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "billingPeriod": "month"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "creator": {
      "@type": "Organization",
      "name": organizationName
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much can I save by replacing my development team with AI agents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companies typically save $360,000+ annually by replacing traditional development teams with our AI agents. The exact savings depend on your current team size and average salaries."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can AI agents ship code compared to human developers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI agents work 24/7 and can ship code 10x faster than traditional development teams, with no breaks, no sick days, and no management overhead."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free trial available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer a free trial with no credit card required. You can cancel anytime and we provide a 30-day money-back guarantee."
        }
      },
      {
        "@type": "Question",
        "name": "What types of development work can AI agents handle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our AI agents can handle full-stack development, including frontend, backend, database design, API development, testing, deployment, and maintenance."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Development Services",
        "item": `${url}#services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Pricing",
        "item": `${url}#pricing`
      }
    ]
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

export default SEOStructuredData; 