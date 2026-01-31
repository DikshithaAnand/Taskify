import { useEffect, useRef, useState } from 'react'

export default function SoundToggle({ isRunning }) {
  const audioRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  // Create audio once
  useEffect(() => {
    audioRef.current = new Audio('/sounds/rain.mp3')
    audioRef.current.loop = true

    return () => {
      audioRef.current.pause()
    }
  }, [])

  // Play / pause based on timer state
  useEffect(() => {
    if (!audioRef.current) return

    if (enabled && isRunning) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [enabled, isRunning])

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? '🌧️ Rain ON' : '🔕 Rain OFF'}
      </button>
    </div>
  )
}
