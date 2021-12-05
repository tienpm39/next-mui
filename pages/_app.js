import 'styles/globals.scss';
import { appWithTranslation } from 'next-i18next';
import Layout from 'container/Layout/Layout';
// import Script from 'next/script';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeProvider from 'context/DarkModeProvider';
import { SearchProvider } from 'context/SearchProvider';
import createEmotionCache from 'styles/createEmotionCache';
import { CacheProvider } from '@emotion/react';

const cache = createEmotionCache();

function MyApp({ Component, router, pageProps }) {
  const { query } = router;
  return (
    <CacheProvider value={cache}>
      {/* <Script src="/assets/js/typewriter.js" strategy="beforeInteractive" /> */}
      <div className="wrapper">
        <SearchProvider query={query}>
          <DarkModeProvider>
            <Layout>
              <CssBaseline />
              <Component {...pageProps} />
            </Layout>
          </DarkModeProvider>
        </SearchProvider>
      </div>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
