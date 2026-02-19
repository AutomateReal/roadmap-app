'use client';

import Script from 'next/script';

export default function GHLTracking() {
    return (
        <Script
            id="ghl-tracking"
            src="https://link.localbizboost.com/js/external-tracking.js"
            data-tracking-id="tk_9dc96c9fdfbb41a6b2e099af338a3c37"
            strategy="afterInteractive"
        />
    );
}
