import { useState } from 'react'
import Timer from './components/Timer'
import FocusRating from './components/FocusRating'
import Insights from './components/Insights'

export default function App() {
  // null = no completed session
  // object = completed session metadata
  const [sessionDone, setSessionDone] = useState(null)

  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem('sessions')) || []
  )

  const addSession = (rating, sessionMeta) => {
    const newSession = {
      rating,
      duration: sessionMeta.duration,
      startedAt: sessionMeta.startedAt,
      completedAt: new Date().toISOString()
    }

    const updated = [...sessions, newSession]
    setSessions(updated)
    localStorage.setItem('sessions', JSON.stringify(updated))

    setSessionDone(null)
  }

  return (
    <div className="app">
      <h1>🌿 FocusSpace</h1>

      {!sessionDone ? (
        <Timer onFinish={(meta) => setSessionDone(meta)} />
      ) : (
        <FocusRating
          onSubmit={(rating) => addSession(rating, sessionDone)}
        />
      )}

      <Insights sessions={sessions} />
    </div>
  )
}
