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
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
