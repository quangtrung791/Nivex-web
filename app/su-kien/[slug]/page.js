import Layout from "@/components/layout/Layout"
import { Metadata } from "next"
import EventDetails from "./ChiTietSuKienComponent";

// Hàm lấy dữ liệu từ API theo slug
async function getTermBySlug(slug) {
    const productionUrl = 'https://nivex.vn';
    const developedUrl = 'http://localhost:3000'
    const res = await fetch(
        `${process.env.NODE_ENV === "production" ? productionUrl : developedUrl}/api/event/${slug}`,
        { cache: "no-store" }
    );
    
    if (!res.ok) return null;
    return await res.json();
}

// Tạo metadata động
export async function generateMetadata({ params }) {
    const { slug } = params
    const data = await getTermBySlug(slug);
    const title = data?.title || "Sự kiện Nivex";
    const desc = data?.short_desc?.replace(/<[^>]+>/g, '') || "Sự kiện tại Nivex tổ chức";
    const keywords = data?.rank_math_seo_keyword || '';
    console.log('[metadata] rank_math_seo_keyword:', data?.rank_math_seo_keyword);
    return {
        title: `${title} | Chi tiết sự kiện Nivex`,
        description: desc,
        keywords,
        alternates: {
            canonical: `https://nivex.vn/su-kien/${slug}`
        },
        openGraph: {
            title: `${title} | Chi tiết sự kiện Nivex`,
            description: desc,
            url: `https://nivex.vn/su-kien/${slug}`,
            siteName: "Nivex",
            images: [
                {
                    url: "/assets/images/logo/Nivex_icon_bg.png",
                    width: 1200,
                    height: 630,
                    alt: `Sự kiện ${title} do chính Nivex tổ chức`
                }
            ],
            locale: "vi_VN",
            type: "website"
        }
    }
}
const toISO = (v) => (v ? new Date(v).toISOString() : undefined);

export default async function EventDetailsPage({ params }) {
  const data = await getTermBySlug(params.slug);
  const canonical = `https://nivex.vn/su-kien/${params.slug}`;

  // Suy luận chế độ tham dự
  const hasVenue =
    data?.location_name || data?.address || data?.city || data?.country;
  const hasOnline = !!data?.link_zoom;
  const attendanceMode = hasVenue && hasOnline
    ? "https://schema.org/MixedEventAttendanceMode"
    : hasOnline
    ? "https://schema.org/OnlineEventAttendanceMode"
    : "https://schema.org/OfflineEventAttendanceMode";

  // Location: hỗ trợ online / offline / cả hai
  const physicalPlace = hasVenue
    ? {
        "@type": "Place",
        name: data?.location_name || "Địa điểm sự kiện",
        address: {
          "@type": "PostalAddress",
          streetAddress: data?.address || undefined,
          addressLocality: data?.city || undefined,
          addressRegion: data?.region || undefined,
          postalCode: data?.postal_code || undefined,
          addressCountry: data?.country || "VN",
        },
      }
    : null;

  const virtualPlace = hasOnline
    ? {
        "@type": "VirtualLocation",
        url: data?.link_zoom,
      }
    : null;

  const location =
    hasVenue && hasOnline
      ? [physicalPlace, virtualPlace]
      : hasVenue
      ? physicalPlace
      : virtualPlace;

  // Offers (nếu có bán vé)
  const price = Number(data?.price);
  const offers =
    Number.isFinite(price) && price > 0
      ? {
          "@type": "Offer",
          price: price,
          priceCurrency: data?.currency || "VND",
          availability: "https://schema.org/InStock",
          url: canonical,
        }
      : undefined;

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data?.title || "Sự kiện Nivex",
    description:
      (data?.short_desc || "")
        .replace(/<[^>]+>/g, "")
        .trim() || "Sự kiện do Nivex tổ chức",
    image: data?.image ? [data.image] : ["/assets/images/logo/Nivex_icon_bg.png"],
    url: canonical,
    mainEntityOfPage: canonical,
    startDate: toISO(data?.start_date || data?.start_time),
    endDate: toISO(data?.end_date || data?.end_time),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: attendanceMode,
    location,
    organizer: {
      "@type": "Organization",
      name: "Nivex",
      url: "https://nivex.vn",
    },
    // Nếu miễn phí
    isAccessibleForFree: !offers,
    // Nếu có bán vé thì thêm offers
    ...(offers ? { offers } : {}),
    inLanguage: "vi-VN",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://nivex.vn/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sự kiện",
        item: "https://nivex.vn/su-kien",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data?.title || "Chi tiết sự kiện",
        item: canonical,
      },
    ],
  };

  return (
    <Layout headerStyle={1} footerStyle={2}>
      {/* JSON-LD: Event + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([eventLd, breadcrumbLd]),
        }}
      />
      <EventDetails />
    </Layout>
  );
}