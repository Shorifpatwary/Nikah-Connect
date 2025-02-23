import BioDetail from "@/app/(front-end)/bio/[bioId]/[slug]/bioDetail";
import { Metadata } from "next";

interface BioDetailPageProps {
  params: {
    bioId: string;
    slug: string;
  };
}

export const dynamic = "force-static"; // Enable static generation
export const revalidate = 86400; // Revalidate the page every 1 day
export const dynamicParams = true; // Allow server-rendering unknown paths on-demand

// Helper function to generate metadata
function generatePageMetadata(slug: string): Metadata {
  const decodedSlug = decodeURIComponent(slug);
  const title = decodedSlug.replace(/\s+/g, "-").toLowerCase();
  const description = `${decodedSlug} এর প্রোফাইল দেখুন। তাদের পটভূমি, পছন্দ-অপছন্দ, এবং মূল্যবোধ সম্পর্কে আরও জানুন Connect Nikah-এ।`;

  return { title, description };
}

// Generate metadata using slug
export async function generateMetadata({
  params,
}: BioDetailPageProps): Promise<Metadata> {
  return generatePageMetadata(params.slug);
}

const BioDetailPage = async ({ params }: BioDetailPageProps) => {
  return (
    <>
      <BioDetail bioId={params.bioId} />
    </>
  );
};

export default BioDetailPage;
