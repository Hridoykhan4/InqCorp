import React from 'react'

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Application render error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <main className="grid min-h-screen place-items-center bg-[#fbfaf7] px-6 text-center">
        <div className="max-w-lg rounded-[2rem] border border-brand-border bg-white p-10 shadow-[0_30px_80px_-50px_rgba(15,35,65,.35)]">
          <img src="/inqcorpLogo.jpeg" alt="ITC" className="mx-auto h-16 w-16 rounded-2xl object-contain" />
          <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-brand-accent">Inqilab Trading Corporation</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-brand-ink">Let’s get you back on track.</h1>
          <p className="mt-4 leading-7 text-brand-muted">This page hit an unexpected problem. Your data is safe—reload the page or return to the catalogue.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" className="btn-brand" onClick={() => window.location.reload()}>Reload page</button>
            <a className="btn-brand-outline" href="/all-products">Open catalogue</a>
          </div>
        </div>
      </main>
    )
  }
}
