export default function Insights({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div className="card">
        <h3>Focus Insights</h3>
        <p>No sessions yet. Complete a session to see insights 🌱</p>
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

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '10px',
          height: '100px',
          marginTop: '1rem'
        }}
      >
        {recentSessions.map((session, index) => {
          const duration = session.duration || 25
          const startedAt = session.startedAt
            ? new Date(session.startedAt).toLocaleString()
            : 'Not recorded'
          const completedAt = session.completedAt
            ? new Date(session.completedAt).toLocaleString()
            : 'Not recorded'

          return (
            <div
              key={index}
              title={`Focus: ${session.rating}
Duration: ${duration} min
Started: ${startedAt}
Completed: ${completedAt}`}
              style={{
                width: '20px',
                height: `${session.rating * 20}px`,
                backgroundColor: '#6c63ff',
                borderRadius: '6px'
              }}
            />
          )
        })}
      </div>

      <p
        style={{
          fontSize: '0.85rem',
          marginTop: '0.5rem',
          opacity: 0.7
        }}
      >
        Showing last {recentSessions.length} sessions
      </p>
    </div>
  )
}
