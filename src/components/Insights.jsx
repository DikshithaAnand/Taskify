
export default function Insights({ sessions }) {
  if (!sessions.length) return null

  const avg =
    sessions.reduce((a, b) => a + Number(b.rating), 0) / sessions.length

  return (
    <div className="card">
      <h3>Focus Insights</h3>
      <p>Average Focus: {avg.toFixed(1)} ⭐</p>
      <ul>
        {sessions.slice(-5).map((s, i) => (
          <li key={i}>{s.date} — {s.rating}⭐</li>
        ))}
      </ul>
    </div>
  )
}
