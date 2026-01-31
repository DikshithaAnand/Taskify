import { useEffect, useState } from 'react'
import SoundToggle from './SoundToggle'

export default function Timer({ onFinish }) {
  const [duration, setDuration] = useState(25) // minutes
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    if (time === 0) {
      setIsRunning(false)
      onFinish(duration)
      return
    }

    const timer = setTimeout(() => {
      setTime(time - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [time, isRunning, duration, onFinish])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const startTimer = () => {
    setIsRunning(true)
    setHasStarted(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setHasStarted(false)
    setTime(duration * 60)
  }

  const handleDurationChange = (e) => {
    const value = Number(e.target.value)
    setDuration(value)
    setTime(value * 60)
    setHasStarted(false)
    setIsRunning(false)
  }

  const getStatusText = () => {
    if (!hasStarted) return '🆕 New Session'
    if (isRunning) return '🟢 Session Running'
    return '⏸️ Session Paused'
  }

  return (
    <div className="card">
      <h2>Focus Session</h2>

      {/* Duration Selector */}
      {!hasStarted && (
        <div style={{ marginBottom: '0.75rem' }}>
          <label>
            Session Duration (minutes):{' '}
            <select value={duration} onChange={handleDurationChange}>
              <option value={2}>2</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
          </label>
        </div>
      )}

      <p style={{ fontWeight: '600' }}>{getStatusText()}</p>

      <p className="timer">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </p>

      <div style={{ marginTop: '1rem' }}>
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={pauseTimer}>Pause</button>
        )}
        <button onClick={resetTimer} style={{ marginLeft: '0.5rem' }}>
          Reset
        </button>
      </div>

      <SoundToggle isRunning={isRunning} />
    </div>
  )
}
