'use client';

import { useEffect } from 'react';

export default function RoadmapView({ data, slug }) {
    // Ensuring LAST_NAME exists in data structure if not passed, or handling it gracefully in display


    // Optional: Scroll to top on load or handle interactions
    useEffect(() => {
        // Trigger GHL Webhook via API Route
        fetch('/api/tracking/page-open', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, data })
        }).catch(err => console.error('GHL Tracking failed:', err));
    }, [slug, data]);

    const DEFAULT_TASKS = {
        W1: {
            title: 'Foundation & Quick Wins',
            subtitle: 'Days 1–7 - Fix the basics that are killing your rankings',
            tasks: [
                { id: 'opt-gbp', name: 'Optimize Google Business Profile', desc: 'Complete all fields: services, areas, hours, attributes. Add cleaning-specific categories.', impact: 'high' },
                { id: 'photos', name: 'Upload 10+ Professional Photos', desc: 'Before/after shots, team photos, equipment. Businesses with 100+ photos get 520% more calls.', impact: 'high' },
                { id: 'reviews-resp', name: 'Respond to All Existing Reviews', desc: 'Reply to every review (positive and negative) within 48 hours. Google rewards engagement.', impact: 'medium' },
                { id: 'nap', name: 'Fix NAP Consistency', desc: 'Ensure your Name, Address, Phone are identical across Google, Yelp, Facebook, and all directories.', impact: 'high' }
            ]
        },
        W2: {
            title: 'Content & Review Engine',
            subtitle: 'Days 8–14 - Build the systems that compound over time',
            tasks: [
                { id: 'review-sys', name: 'Launch a Review Request System', desc: 'Automate review requests after every completed job. Target: 5-10 new reviews per month minimum.', impact: 'high' },
                { id: 'posts', name: 'Start Publishing Weekly Google Posts', desc: 'Share tips, before/afters, testimonials. 3-4 posts per week signals an active business to Google.', impact: 'high' },
                { id: 'service-pages', name: 'Add Service-Area Pages to Website', desc: 'Create dedicated pages for each city/neighborhood you serve. Targets long-tail local keywords.', impact: 'medium' }
            ]
        },
        W3: {
            title: 'AI Search & Multi-Platform Visibility',
            subtitle: 'Days 15–21 - Get found where your competitors aren\'t looking yet',
            tasks: [
                { id: 'ai-opt', name: 'Optimize for AI Search Platforms', desc: 'Structure your website and GBP so ChatGPT, Gemini, and Perplexity recommend your business.', impact: 'high' },
                { id: 'citations', name: 'Build Citation Network', desc: 'Submit to 40+ high-authority directories (BBB, Yelp, industry-specific portfolios for both residential and commercial).', impact: 'medium' },
                { id: 'schema', name: 'Add Schema Markup to Website', desc: 'Add LocalBusiness structured data so search engines understand your services, areas, and reviews.', impact: 'medium' }
            ]
        },
        W4: {
            title: 'Measure, Optimize & Scale',
            subtitle: 'Days 22–30 - Lock in your gains and plan for month 2',
            tasks: [
                { id: 'audit', name: 'Run a New Ranking Audit', desc: 'Compare your heatmap and keyword rankings to Day 1. Document improvements.', impact: 'medium' },
                { id: 'keywords', name: 'Analyze Which Keywords Moved', desc: 'Double down on the keywords gaining traction. Identify new opportunities.', impact: 'high' },
                { id: 'automation', name: 'Set Up Ongoing Automation', desc: 'Automate posts, review monitoring, and reporting so your visibility compounds on autopilot.', impact: 'high' }
            ]
        }
    };

    // Merge overrides
    const roadmapData = JSON.parse(JSON.stringify(DEFAULT_TASKS)); // Deep clone
    const overrides = data.ROADMAP_OVERRIDE || {};
    const doneTasks = overrides.DONE_TASKS || [];
    const taskOverrides = overrides.TASK_OVERRIDES || {};

    Object.keys(roadmapData).forEach(week => {
        roadmapData[week].tasks = roadmapData[week].tasks.map(task => {
            const isDone = doneTasks.includes(task.name);
            const override = taskOverrides[task.name] || {};
            return {
                ...task,
                ...override,
                isDone
            };
        });
    });

    const renderTask = (task) => (
        <div className={`task-item ${task.isDone ? 'done' : ''}`} key={task.id || task.name}>
            <div className="task-check">
                {task.isDone && <span className="check-mark">✓</span>}
            </div>
            <div className="task-content">
                <div className="task-name" style={{ textDecoration: task.isDone ? 'line-through' : 'none', color: task.isDone ? '#94A3B8' : 'inherit' }}>
                    {task.name}
                </div>
                <div className="task-desc">{task.desc}</div>
            </div>
            {!task.isDone && (
                <div className={`task-impact ${task.impact}`}>
                    {task.impact.charAt(0).toUpperCase() + task.impact.slice(1)} Impact
                </div>
            )}
            {task.isDone && <div className="task-status-label">DONE</div>}
        </div>
    );

    return (
        <div className="roadmap-container">
            {/* PAGE 1: COVER */}
            <div className="page cover-page">
                <div className="cover-header" style={{ justifyContent: 'flex-start' }}>
                    <div className="cover-badge">Prepared for {data.FULL_NAME || data.FIRST_NAME}</div>
                </div>

                <div className="cover-main">
                    <div className="cover-label">Custom Growth Roadmap</div>
                    <h1 className="cover-title">
                        30-Day <span>Roadmap</span> to Dominate Google in Your Market
                    </h1>
                    <p className="cover-subtitle">
                        A personalized roadmap for <span className="cover-company">{data.COMPANY_NAME}</span> to capture more contract value through local search visibility.
                    </p>
                    {data.MISSION_STATEMENT && (
                        <div className="cover-mission" style={{
                            marginTop: '30px',
                            padding: '20px',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderLeft: '4px solid #0070f3',
                            borderRadius: '0 8px 8px 0',
                            fontStyle: 'italic',
                            color: '#fff',
                            fontSize: '1.1rem',
                            lineHeight: '1.6',
                            backdropFilter: 'blur(10px)'
                        }}>
                            "{data.MISSION_STATEMENT}"
                        </div>
                    )}
                </div>

                <div className="cover-footer">
                    <div className="cover-stat">
                        <div className="cover-stat-value">76%</div>
                        <div className="cover-stat-label">of local searchers visit a business within 24 hours</div>
                    </div>
                    <div className="cover-stat">
                        <div className="cover-stat-value">$38</div>
                        <div className="cover-stat-label">average return for every $1 invested in local SEO</div>
                    </div>
                    <div className="cover-stat">
                        <div className="cover-stat-value">90%+</div>
                        <div className="cover-stat-label">of consumers use search to find local services</div>
                    </div>
                </div>
            </div>

            {/* PAGE 2: PERSONALIZED SNAPSHOT */}
            <div className="page snapshot-page">
                <div className="page-header">
                    <div className="page-header-title">{data.COMPANY_NAME} - Visibility Snapshot</div>
                    <div className="page-header-page">Page 1</div>
                </div>

                <h2 className="snapshot-title">Your Current Visibility</h2>
                <p className="snapshot-subtitle">Here&apos;s how {data.COMPANY_NAME} shows up across Google and AI search platforms right now.</p>

                {/* Score Cards */}
                <div className="score-grid">
                    <div className="score-card danger">
                        <div className="score-value">{data.GBP_SCORE}/100</div>
                        <div className="score-label">Google Business Profile Score</div>
                    </div>
                    <div className="score-card warning">
                        <div className="score-value">{data.REVIEW_COUNT}</div>
                        <div className="score-label">Total Google Reviews</div>
                    </div>
                    <div className="score-card danger">
                        <div className="score-value">{data.AI_VISIBILITY}</div>
                        <div className="score-label">AI Search Visibility</div>
                    </div>
                </div>

                {/* Heatmap Screenshot */}
                <div className="screenshot-container">
                    {data.HAS_SCREENSHOT ? (
                        <div className="screenshot-wrapper">
                            <img
                                src={`/screenshots/${slug}.bmp?t=${data.HAS_SCREENSHOT}`}
                                alt="Local Ranking Heatmap"
                                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                            />
                            <div className="screenshot-caption text-center" style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                                🗺️ Live Local Ranking Heatmap for {data.COMPANY_NAME}
                            </div>
                        </div>
                    ) : (
                        <div className="screenshot-placeholder">
                            <div className="screenshot-placeholder-icon">🗺️</div>
                            <div className="screenshot-placeholder-text">INSERT: Google Maps Ranking Heatmap Screenshot</div>
                            <div className="screenshot-placeholder-sub">Paste a screenshot from the audit tool showing their local ranking heatmap here</div>
                        </div>
                    )}
                </div>

                {/* Competitor Comparison */}
                <table className="competitor-table">
                    <thead>
                        <tr>
                            <th>Business</th>
                            <th>Google Reviews</th>
                            <th>Maps Ranking</th>
                            <th>AI Search</th>
                            <th>Monthly Posts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="you">
                            <td>{data.COMPANY_NAME}</td>
                            <td>{data.REVIEW_COUNT}</td>
                            <td>{data.MAPS_RANK}</td>
                            <td><span className="status-dot red"></span> Not Found</td>
                            <td>{data.POST_COUNT}</td>
                        </tr>
                        <tr>
                            <td>{data.COMPETITOR_1}</td>
                            <td>{data.COMP1_REVIEWS}</td>
                            <td>{data.COMP1_RANK}</td>
                            <td><span className="status-dot green"></span> Visible</td>
                            <td>{data.COMP1_POSTS}</td>
                        </tr>
                        <tr>
                            <td>{data.COMPETITOR_2}</td>
                            <td>{data.COMP2_REVIEWS}</td>
                            <td>{data.COMP2_RANK}</td>
                            <td><span className="status-dot yellow"></span> Partial</td>
                            <td>{data.COMP2_POSTS}</td>
                        </tr>
                        <tr>
                            <td>{data.COMPETITOR_3}</td>
                            <td>{data.COMP3_REVIEWS}</td>
                            <td>{data.COMP3_RANK}</td>
                            <td><span className="status-dot green"></span> Visible</td>
                            <td>{data.COMP3_POSTS}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Key Finding */}
                <div className="key-finding">
                    <div className="key-finding-title">⚠️ Key Finding</div>
                    <div className="key-finding-text">
                        {data.COMPANY_NAME} is currently <strong>invisible on AI search platforms</strong> (ChatGPT, Google AI Mode, Perplexity). This means when property managers and facility directors use AI-powered search to find commercial cleaning services, your competitors are being recommended - not you. This gap is growing every month.
                    </div>
                </div>
            </div>

            {/* PAGE 3: WEEK 1 & 2 */}
            <div className="page roadmap-page">
                <div className="page-header">
                    <div className="page-header-title">30-Day Roadmap</div>
                    <div className="page-header-page">Page 2</div>
                </div>

                <h2 className="roadmap-title">Your 30-Day Roadmap</h2>
                <p className="roadmap-subtitle">The exact steps to take - in order - to start dominating local search and capturing high-value contracts.</p>

                {/* WEEK 1 */}
                <div className="week-block">
                    <div className="week-header">
                        <div className="week-number">W1</div>
                        <div className="week-info">
                            <h3>{roadmapData.W1.title}</h3>
                            <p>{roadmapData.W1.subtitle}</p>
                        </div>
                    </div>
                    <div className="week-tasks">
                        {roadmapData.W1.tasks.map(renderTask)}
                    </div>
                </div>

                {/* WEEK 2 */}
                <div className="week-block">
                    <div className="week-header">
                        <div className="week-number">W2</div>
                        <div className="week-info">
                            <h3>{roadmapData.W2.title}</h3>
                            <p>{roadmapData.W2.subtitle}</p>
                        </div>
                    </div>
                    <div className="week-tasks">
                        {roadmapData.W2.tasks.map(renderTask)}
                    </div>
                </div>
            </div>

            {/* PAGE 4: WEEK 3 & 4 + RESULTS */}
            <div className="page roadmap-page">
                <div className="page-header">
                    <div className="page-header-title">30-Day Roadmap</div>
                    <div className="page-header-page">Page 3</div>
                </div>

                {/* WEEK 3 */}
                <div className="week-block">
                    <div className="week-header">
                        <div className="week-number">W3</div>
                        <div className="week-info">
                            <h3>{roadmapData.W3.title}</h3>
                            <p>{roadmapData.W3.subtitle}</p>
                        </div>
                    </div>
                    <div className="week-tasks">
                        {roadmapData.W3.tasks.map(renderTask)}
                    </div>
                </div>

                {/* WEEK 4 */}
                <div className="week-block">
                    <div className="week-header">
                        <div className="week-number">W4</div>
                        <div className="week-info">
                            <h3>{roadmapData.W4.title}</h3>
                            <p>{roadmapData.W4.subtitle}</p>
                        </div>
                    </div>
                    <div className="week-tasks">
                        {roadmapData.W4.tasks.map(renderTask)}
                    </div>
                </div>

                {/* Expected Results */}
                <div className="expected-results">
                    <h3>📈 30-Day Growth Milestones</h3>
                    <div className="results-grid">
                        <div className="result-item">
                            <div className="result-value">Visibility Index</div>
                            <div className="result-label">Broadening your Map Pack "Green Zone" for local keywords</div>
                        </div>
                        <div className="result-item">
                            <div className="result-value">Lead Pipeline</div>
                            <div className="result-label">Establishing a predictable flow of inbound contract inquiries</div>
                        </div>
                        <div className="result-item">
                            <div className="result-value">AI Footprint</div>
                            <div className="result-label">Verified recommendation status across ChatGPT, Gemini, and Perplexity</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAGE 5: CTA */}
            <div className="page cta-page">
                <div className="cta-icon">🚀</div>
                <h2 className="cta-title">
                    Ready to Put This <span>Roadmap Into Action?</span>
                </h2>
                <p className="cta-text">
                    This roadmap shows you <strong>what</strong> to do. Let me show you <strong>how</strong> to do it - in 15 minutes, I&apos;ll walk you through the fastest path to capturing the leads your competitors are taking right now.
                </p>
                <a href="https://link.localbizboost.com/widget/booking/lobOMW2RpbL2Vu9SblWG" className="cta-button" onClick={() => {
                    // Optional: Track explicitly if needed, but GA4 auto-tracks outbound clicks usually
                    if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'click_booking', {
                            'event_category': 'engagement',
                            'event_label': 'CTA Button'
                        });
                    }
                }}>
                    Book Your Free 15-Min Strategy Session →
                </a>
                <div className="cta-features">
                    <div className="cta-feature"><strong>✓</strong> No cost</div>
                    <div className="cta-feature"><strong>✓</strong> No commitment</div>
                    <div className="cta-feature"><strong>✓</strong> No pitch</div>
                </div>
                <div className="cta-footer">
                    Prepared exclusively for {data.FIRST_NAME} at {data.COMPANY_NAME} by Local Biz Boost
                </div>
            </div>
        </div>
    );
}
