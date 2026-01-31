
import { useState } from 'react'

export default function FocusRating({ onSubmit }) {
  const [rating, setRating] = useState(3)

  return (
    <div className="card">
      <h2>How focused were you?</h2>
      <input
        type="range"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <p>Rating: {rating}</p>
      <button onClick={() => onSubmit(rating)}>Save Session</button>
    </div>
  )
}
