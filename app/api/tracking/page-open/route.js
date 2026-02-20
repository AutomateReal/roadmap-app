import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { slug, data, isInternal } = body;

        if (isInternal) {
            console.log(`[Tracking] Internal visit detected for slug: ${slug}. Skipping GHL notification.`);
            return NextResponse.json({ success: true, message: 'Internal visit skipped' });
        }

        const webhookUrl = process.env.GHL_WEBHOOK_URL;

        if (!webhookUrl) {
            console.log('GHL_WEBHOOK_URL not set, skipping notification.');
            return NextResponse.json({ success: true, message: 'Webhook not configured' });
        }

        const ghlPayload = {
            event: 'roadmap_opened',
            timestamp: new Date().toISOString(),
            lead_slug: slug,
            contact: {
                email: data.EMAIL || `no-email-${slug}@example.com`,
                name: data.FULL_NAME || `${data.FIRST_NAME} ${data.LAST_NAME || ''}`.trim(),
                first_name: data.FIRST_NAME,
                last_name: data.LAST_NAME,
                company_name: data.COMPANY_NAME,
                city_name: data.CITY, // Renamed to city_name to avoid auto-mapping to Name
            },
            roadmap_url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/roadmap/${slug}`,
            metadata: {
                source: 'Roadmap App',
                attribution: 'Personalized Lead Magnet',
                lead_data_present: !!data.EMAIL
            }
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ghlPayload),
        });

        if (!response.ok) {
            throw new Error(`GHL Webhook failed: ${response.statusText}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in GHL Webhook route:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
