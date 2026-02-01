import { useEffect, useRef, useState } from 'react'

export default function SoundToggle({ isRunning }) {
  const audioRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const audio = new Audio('/sounds/rain.mp3')
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    if (enabled && isRunning) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [enabled, isRunning])

  const toggleSound = () => {
    setEnabled((prev) => {
      const next = !prev
      if (next && isRunning && audioRef.current) {
        audioRef.current.play().catch(() => {})
      }
      return next
    })
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={toggleSound}>
        {enabled ? '🌧️ Rain ON' : '🔕 Rain OFF'}
      </button>
    </div>
  )
}
