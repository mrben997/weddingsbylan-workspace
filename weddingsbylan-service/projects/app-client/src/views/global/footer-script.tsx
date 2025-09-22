import NextScript from 'next/script'

export default function FooterScripts() {
  return (
    <>
      <NextScript src='/public/js/jquery.js'></NextScript>
      <NextScript src='/public/js/script.js' strategy='afterInteractive'></NextScript>
    </>
  )
}
