
import { useState } from 'react'
import Timer from './components/Timer'
import FocusRating from './components/FocusRating'
import Insights from './components/Insights'

export default function App() {
  const [sessionDone, setSessionDone] = useState(false)
  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem('sessions')) || []
  )

  const addSession = (rating) => {
    const newSession = {
      rating,
      date: new Date().toLocaleString()
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
        <Timer onFinish={() => setSessionDone(true)} />
      ) : (
        <FocusRating onSubmit={addSession} />
      )}

      <Insights sessions={sessions} />
    </div>
  )
}
