import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';
import '@fontsource/open-sans';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Router from 'next/router';
import Loader from '../components/Loader';
import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostProvider } from '../context/postContext';
import { ThemeProvider } from '../context/themeContext';
import { AuthProvider } from '../context/authContext';
import { FriendProvider } from '../context/friendContext';

const pageVariant = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
};

function MyApp({ Component, pageProps: { ...pageProps }, router }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false);
  });
  return (
    <AuthProvider>
      <ThemeProvider>
        <motion.div
          key={router.router}
          initial="pageInitial"
          animate="pageAnimate"
          variants={pageVariant}
        >
          {loading ? (
            <Layout>
              <Loader />
            </Layout>
          ) : (
            <Layout>
              <FriendProvider>
                <PostProvider>
                  <Component {...pageProps} />
                </PostProvider>
              </FriendProvider>
            </Layout>
          )}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme="light"
          />
        </motion.div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
