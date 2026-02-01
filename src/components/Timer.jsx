import { useEffect, useState } from 'react'
import SoundToggle from './SoundToggle'

export default function Timer({ onFinish }) {
  const [duration, setDuration] = useState(25)
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [startedAt, setStartedAt] = useState(null)

  useEffect(() => {
    if (!isRunning) return

    if (time === 0) {
      setIsRunning(false)

      // Session completed successfully
      onFinish({
        duration,
        startedAt
      })

      return
    }

    const timer = setTimeout(() => {
      setTime((t) => t - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [time, isRunning, duration, startedAt, onFinish])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const startTimer = () => {
    if (!hasStarted) {
      setStartedAt(new Date().toISOString())
      setHasStarted(true)
    }
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setHasStarted(false)
    setStartedAt(null)
    setTime(duration * 60)
  }

  const handleDurationChange = (e) => {
    const value = Number(e.target.value)
    setDuration(value)
    setTime(value * 60)
    setHasStarted(false)
    setStartedAt(null)
    setIsRunning(false)
  }

  return (
    <div className="card">
      <h2>Focus Session</h2>

      {!hasStarted && (
        <div style={{ marginBottom: '0.75rem' }}>
          <label>
            Session Duration:{' '}
            <select value={duration} onChange={handleDurationChange}>
              <option value={1}>1</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>{' '}
            min
          </label>
        </div>
      )}

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
