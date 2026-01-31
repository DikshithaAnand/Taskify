import { useEffect, useState } from 'react'

export default function Timer({ onFinish }) {
  const [time, setTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)

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
  }, [time, isRunning])

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const resetTimer = () => {
    setIsRunning(false)
    setTime(25 * 60)
  }

  return (
    <div className="card">
      <h2>Focus Session</h2>

      <p className="timer">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </p>

      <div style={{ marginTop: '1rem' }}>
        {!isRunning ? (
          <button onClick={() => setIsRunning(true)}>Start</button>
        ) : (
          <button onClick={() => setIsRunning(false)}>Pause</button>
        )}
        <button onClick={resetTimer} style={{ marginLeft: '0.5rem' }}>
          Reset
        </button>
      </div>
    </div>
  )
}
