import './Charts.css'

function Charts({ data }) {
  // Simple bar chart component
  const BarChart = ({ title, data: chartData }) => {
    if (!chartData || chartData.length === 0) {
      return (
        <div className="chart-empty">
          <p>No data available</p>
        </div>
      )
    }

    const maxValue = Math.max(...chartData.map(d => d.value))

    return (
      <div className="chart-container">
        <h4 className="chart-title">{title}</h4>
        <div className="chart-bars">
          {chartData.map((item, index) => (
            <div key={index} className="chart-bar-item">
              <div className="bar-label">{item.label}</div>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    background: `linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)`
                  }}
                />
                <span className="bar-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Simple line chart component
  const LineChart = ({ title, data: chartData }) => {
    if (!chartData || chartData.length === 0) {
      return (
        <div className="chart-empty">
          <p>No data available</p>
        </div>
      )
    }

    const maxValue = Math.max(...chartData.map(d => d.value), 1)
    const chartHeight = 200
    const chartWidth = 400
    const padding = 40

    return (
      <div className="chart-container">
        <h4 className="chart-title">{title}</h4>
        <div className="line-chart-wrapper">
          <svg className="line-chart" viewBox={`0 0 ${chartWidth} ${chartHeight + padding}`} preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const y = padding + ratio * chartHeight
              return (
                <line
                  key={idx}
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              )
            })}
            
            {/* Area fill */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
              </linearGradient>
            </defs>
            
            {/* Area path */}
            {chartData.length > 1 && (
              <polygon
                points={[
                  `${0},${padding + chartHeight}`,
                  ...chartData.map((item, index) => {
                    const x = (index / (chartData.length - 1)) * (chartWidth - padding * 2) + padding
                    const y = padding + chartHeight - (item.value / maxValue) * chartHeight
                    return `${x},${y}`
                  }),
                  `${chartWidth - padding},${padding + chartHeight}`
                ].join(' ')}
                fill="url(#lineGradient)"
              />
            )}
            
            {/* Line path */}
            <polyline
              points={chartData.map((item, index) => {
                const x = (index / (chartData.length - 1 || 1)) * (chartWidth - padding * 2) + padding
                const y = padding + chartHeight - (item.value / maxValue) * chartHeight
                return `${x},${y}`
              }).join(' ')}
              fill="none"
              stroke="#10B981"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {chartData.map((item, index) => {
              const x = (index / (chartData.length - 1 || 1)) * (chartWidth - padding * 2) + padding
              const y = padding + chartHeight - (item.value / maxValue) * chartHeight
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#10B981"
                    stroke="#F8FAFC"
                    strokeWidth="2"
                  />
                </g>
              )
            })}
          </svg>
          
          {/* Labels */}
          <div className="line-chart-labels">
            {chartData.map((item, index) => (
              <div key={index} className="line-chart-label">
                <span className="label-text">{item.label}</span>
                <span className="label-value">{item.value.toLocaleString()} CFT</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Simple pie/donut chart component
  const DonutChart = ({ title, data: chartData }) => {
    if (!chartData || chartData.length === 0) {
      return (
        <div className="chart-empty">
          <p>No data available</p>
        </div>
      )
    }

    const total = chartData.reduce((sum, item) => sum + item.value, 0)
    const colors = ['#2E4A6B', '#10B981', '#059669', '#047857', '#1A2F4A']

    let currentAngle = 0

    return (
      <div className="chart-container">
        <h4 className="chart-title">{title}</h4>
        <div className="donut-chart-wrapper">
          <svg className="donut-chart" viewBox="0 0 200 200">
            {chartData.map((item, index) => {
              const percentage = (item.value / total) * 100
              const angle = (percentage / 100) * 360
              const startAngle = currentAngle
              const endAngle = currentAngle + angle
              
              const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180)
              const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180)
              const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180)
              const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180)
              
              const largeArc = angle > 180 ? 1 : 0
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ')

              currentAngle += angle

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                  opacity={0.8}
                />
              )
            })}
            <circle cx="100" cy="100" r="50" fill="#0a0e27" />
            <text x="100" y="95" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="600">
              {total}
            </text>
            <text x="100" y="115" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12">
              Total
            </text>
          </svg>
          <div className="donut-legend">
            {chartData.map((item, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="legend-label">{item.label}</span>
                <span className="legend-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="charts-container">
      {data?.barChart && (
        <div className="chart-card">
          <BarChart title={data.barChart.title} data={data.barChart.data} />
        </div>
      )}
      {data?.lineChart && (
        <div className="chart-card">
          <LineChart title={data.lineChart.title} data={data.lineChart.data} />
        </div>
      )}
      {data?.donutChart && (
        <div className="chart-card">
          <DonutChart title={data.donutChart.title} data={data.donutChart.data} />
        </div>
      )}
    </div>
  )
}

export default Charts

