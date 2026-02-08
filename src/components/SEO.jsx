import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords, image, type = 'website' }) {
  const location = useLocation();
  const siteTitle = "Vertex Global Tech";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = "https://vertexglobaltech.com"; // Replace with actual domain
  const currentUrl = `${siteUrl}${location.pathname}`;
  const defaultImage = `${siteUrl}/og-image.jpg`; // Ensure this image exists in public folder or use external URL

  return (
    <HelmetProvider>
      <Helmet>
        {/* Standard Metadata */}
        <title>{fullTitle}</title>
        <meta name="description" content={description || "Vertex Global Tech - Premium Digital Solutions for Business Growth."} />
        <meta name="keywords" content={keywords || "web development, app development, ui/ux design, seo services, digital transformation"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description || "Vertex Global Tech - Premium Digital Solutions for Business Growth."} />
        <meta property="og:image" content={image || defaultImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description || "Vertex Global Tech - Premium Digital Solutions for Business Growth."} />
        <meta name="twitter:image" content={image || defaultImage} />
      </Helmet>
    </HelmetProvider>
  );
}

