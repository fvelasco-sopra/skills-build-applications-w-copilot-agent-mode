import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill mb-3">
            OctoFit Tracker
          </span>
          <h1 className="display-4 fw-bold">Train smarter with a connected fitness hub.</h1>
          <p className="lead text-muted mt-3">
            Track workouts, celebrate milestones, and stay motivated with a modern multi-tier experience.
          </p>
          <div className="d-flex gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="#features">
              Explore features
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="#api">
              API status
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-semibold">Today at a glance</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0">12,450 steps logged</li>
                <li className="list-group-item px-0">4 team challenges active</li>
                <li className="list-group-item px-0">3 personal goals on track</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section id="features" className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Activity logging</h3>
              <p className="text-muted">Capture workouts and daily movement in one place.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Team challenges</h3>
              <p className="text-muted">Create competitions and keep motivation high.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5">Personalized insights</h3>
              <p className="text-muted">Receive smarter workout suggestions from your data.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="api" className="mt-5">
        <div className="alert alert-success d-inline-block mb-0" role="status">
          Backend API is ready to serve requests on port 8000.
        </div>
      </section>
    </main>
  )
}

export default App
