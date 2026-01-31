export default function Insights({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="card">
        <h3>Focus Insights</h3>
        <p>No sessions yet. Start a focus session 🌱</p>
      </div>
    )
  }

  const recentSessions = sessions.slice(-5)
  const average =
    sessions.reduce((sum, s) => sum + Number(s.rating), 0) / sessions.length

  return (
    <div className="card">
      <h3>Focus Insights</h3>

      <p style={{ marginBottom: '0.5rem' }}>
        Average Focus: <strong>{average.toFixed(1)}</strong> ⭐
      </p>

      {/* Visual Bar Insights */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          height: '100px',
          marginTop: '1rem'
        }}
      >
        {recentSessions.map((session, index) => (
          <div
            key={index}
            title={`Focus: ${session.rating}`}
            style={{
              width: '20px',
              height: `${session.rating * 20}px`,
              backgroundColor: '#6c63ff',
              borderRadius: '6px'
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.7 }}>
        Showing last {recentSessions.length} sessions
      </p>
    </div>
  )
}
