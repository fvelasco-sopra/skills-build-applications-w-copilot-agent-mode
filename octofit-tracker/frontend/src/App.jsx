import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const links = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

const hasCodespaceName = Boolean(import.meta.env.VITE_CODESPACE_NAME?.trim())

function App() {
  return (
    <main className="container py-5">
      <header className="mb-4">
        <h1 className="display-5 fw-bold mb-2">OctoFit Tracker</h1>
        <p className="text-muted mb-0">
          React 19 presentation tier for users, activities, teams, leaderboard, and workouts.
        </p>
      </header>

      {!hasCodespaceName && (
        <div className="alert alert-warning" role="alert">
          <p className="mb-1 fw-semibold">VITE_CODESPACE_NAME is not set.</p>
          <p className="mb-0 small">
            Requests will fallback to http://localhost:8000/api/[component]/.
          </p>
        </div>
      )}

      <nav className="nav nav-pills flex-wrap gap-2 mb-4" aria-label="Sections">
        {links.map((link) => (
          <NavLink
            key={link.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : 'text-secondary'}`}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default App
