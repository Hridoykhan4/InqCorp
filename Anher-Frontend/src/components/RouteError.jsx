import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

export const RouteError = () => {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-6 text-center">
      <div className="max-w-xl">
        <span className="text-sm font-black uppercase tracking-[.25em] text-brand-accent">{notFound ? '404' : 'Page unavailable'}</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-brand-ink sm:text-6xl">{notFound ? 'This route has moved.' : 'A small detour.'}</h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-brand-muted">The website is still available. Continue to our product catalogue or return home.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-brand-outline">Go home</Link>
          <Link to="/all-products" className="btn-brand">Browse products</Link>
        </div>
      </div>
    </main>
  )
}
