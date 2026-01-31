import { useState } from 'react'
import Timer from './components/Timer'
import FocusRating from './components/FocusRating'
import Insights from './components/Insights'

export default function App() {
  // false = no completed session
  // number = completed session duration (in minutes)
  const [sessionDone, setSessionDone] = useState(false)

  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem('sessions')) || []
  )

  const addSession = (rating, duration) => {
    const newSession = {
      rating,
      duration,
      completedAt: new Date().toISOString()
    }

    const updated = [...sessions, newSession]
    setSessions(updated)
    localStorage.setItem('sessions', JSON.stringify(updated))

    setSessionDone(false)
  }

  return (
    <div className="app">
      <h1>🌿 FocusSpace</h1>

      {!sessionDone ? (
        <Timer onFinish={(duration) => setSessionDone(duration)} />
      ) : (
        <FocusRating
          onSubmit={(rating) => addSession(rating, sessionDone)}
        />
      )}

      <Insights sessions={sessions} />
    </div>
  )
}
