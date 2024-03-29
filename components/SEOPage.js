import { Fragment } from 'react';
import { NextSeo } from 'next-seo';

const SEOPage = ({ name, path, children }) => {
  const title = `Fast Feedback – ${name}`;
  const url = `https://nextjs-fast-feedback.vercel.app${path}`;

  return (
    <Fragment>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      {children}
    </Fragment>
  );
};

export default SEOPage;
