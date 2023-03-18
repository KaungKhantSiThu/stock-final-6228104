import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Stock Final</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="home-page">
          <div className="d-flex flex-column justify-content-center w-100 h-100">
              <h2>Click Supplier Management to see a list of suppliers</h2>
          </div>
      </main>
    </>
  )
}
