import { useEffect, useState } from 'react'
import SoundToggle from './SoundToggle'

export default function Timer({ onFinish }) {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    if (time === 0) {
      setIsRunning(false)
      onFinish()
      return
    }

    const timer = setTimeout(() => {
      setTime(time - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [time, isRunning, onFinish])

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
    setTime(25 * 60)
  }

  const getStatusText = () => {
    if (!hasStarted) return '🆕 New Session'
    if (isRunning) return '🟢 Session Running'
    return '⏸️ Session Paused'
  }

  const getStatusColor = () => {
    if (!hasStarted) return '#1565c0'
    if (isRunning) return '#2e7d32'
    return '#c62828'
  }

  return (
    <div className="card">
      <h2>Focus Session</h2>

      {/* Status Indicator */}
      <p
        style={{
          color: getStatusColor(),
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}
      >
        {getStatusText()}
      </p>

      {/* Timer */}
      <p className="timer">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </p>

      {/* Controls */}
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

      {/* Ambient Sound Toggle */}
      <SoundToggle isRunning={isRunning} />
    </div>
  )
}
