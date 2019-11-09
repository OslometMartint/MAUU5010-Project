import Document, { Head, Main, NextScript } from "next/document";
import 'isomorphic-unfetch';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width" />
          <link rel="stylesheet" href="/style.css" />
          <link rel="stylesheet" href="/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
