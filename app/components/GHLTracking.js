'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

export default function GHLTracking() {
    const [isInternal, setIsInternal] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams(window.location.search);
        const isPreview = params.get('preview') === 'true';
        const wasInternal = localStorage.getItem('isInternal') === 'true';

        if (isPreview || wasInternal) {
            setIsInternal(true);
            if (isPreview) {
                localStorage.setItem('isInternal', 'true');
            }
        }
    }, []);

    if (isInternal) {
        return null;
    }

    return (
        <Script
            id="ghl-tracking"
            src="https://link.localbizboost.com/js/external-tracking.js"
            data-tracking-id="tk_9dc96c9fdfbb41a6b2e099af338a3c37"
            strategy="afterInteractive"
        />
    );
}
