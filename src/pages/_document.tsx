import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`bg-primary text-slate-900`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
