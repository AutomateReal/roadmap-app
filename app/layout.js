import './globals.css';
import GoogleAnalytics from './components/GoogleAnalytics';

export const metadata = {
  title: 'Your Personalized 30-Day Growth Roadmap',
  description: 'A custom plan to help your commercial cleaning business dominate local search.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-5WC5GZMJZN" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
