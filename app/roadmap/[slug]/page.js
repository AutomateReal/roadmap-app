import RoadmapView from '../../components/RoadmapView';
import leads from '../../lib/leads.json';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const lead = leads[slug];

    if (!lead) {
        return {
            title: 'Roadmap Not Found',
        };
    }

    return {
        title: `30-Day Growth Roadmap for ${lead.COMPANY_NAME}`,
        description: `A personalized plan prepared for ${lead.FIRST_NAME} at ${lead.COMPANY_NAME}.`,
    };
}

export default async function RoadmapPage({ params }) {
    const { slug } = await params;
    const lead = leads[slug];

    if (!lead) {
        notFound();
    }

    return <RoadmapView data={lead} slug={slug} />;
}
