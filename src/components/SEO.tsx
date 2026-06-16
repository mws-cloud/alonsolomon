import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://solomon-law.co.il";
const DEFAULT_TITLE = "עו״ד אלון סולומון | משרד עורכי דין לדיני משפחה וגירושין";
const DEFAULT_DESCRIPTION = "משרד אלון סולומון ושות' - ליווי משפטי מלא לפני הגירושים ובמהלכם. ייעוץ משפטי אישי, אסטרטגי ומפת דרכים מעשית. צור קשר לייעוץ ראשוני.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title ? `${title} | עו״ד אלון סולומון` : DEFAULT_TITLE;
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={fullCanonical} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="עו״ד אלון סולומון - משרד עורכי דין לדיני משפחה" />
      <meta property="og:site_name" content="עו״ד אלון סולומון" />
      <meta property="og:locale" content="he_IL" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
