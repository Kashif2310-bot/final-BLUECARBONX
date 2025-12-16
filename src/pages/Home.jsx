import { useApp } from '../context/AppContext'
import ProjectCard from '../components/ProjectCard'
import Charts from '../components/Charts'
import './Home.css'

function Home() {
  const { projects } = useApp()

  // Calculate stats
  const totalProjects = projects.length
  const totalCarbonRestored = projects
    .reduce((sum, p) => sum + (p.cftAmount || 0), 0)
  const totalTokensIssued = projects
    .filter(p => p.nftTokenId)
    .length

  // Prepare monthly restoration data
  const getMonthlyRestoration = () => {
    const monthlyData = {}
    
    projects.forEach(project => {
      if (project.cftAmount && project.cftAmount > 0 && project.createdAt) {
        const date = new Date(project.createdAt)
        if (isNaN(date.getTime())) return // Skip invalid dates
        
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            label: monthName,
            value: 0,
            sortKey: monthKey
          }
        }
        monthlyData[monthKey].value += project.cftAmount
      }
    })

    // Sort by month key and get last 6 months
    return Object.values(monthlyData)
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      .slice(-6)
      .map(({ sortKey, ...rest }) => rest) // Remove sortKey from output
  }

  // Prepare Projects vs CFT chart data
  const projectsVsCFT = projects
    .filter(p => p.cftAmount && p.cftAmount > 0)
    .map(p => ({
      label: p.name || 'Untitled',
      value: p.cftAmount
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8) // Top 8 projects

  // Prepare chart data
  const chartData = {
    barChart: {
      title: 'Projects vs CFT',
      data: projectsVsCFT
    },
    lineChart: {
      title: 'Monthly Restoration',
      data: getMonthlyRestoration()
    }
  }

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your carbon tokenization projects</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Total Projects</h3>
            <p className="stat-value">{totalProjects}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌱</div>
          <div className="stat-content">
            <h3>Total Carbon Restored</h3>
            <p className="stat-value">{totalCarbonRestored.toLocaleString()} CFT</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎨</div>
          <div className="stat-content">
            <h3>Total Tokens Issued</h3>
            <p className="stat-value">{totalTokensIssued}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-main-grid">
        {/* Map Section */}
        <div className="map-section">
          <h2>Project Locations</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="india-outline">
                <svg viewBox="0 0 1000 1200" className="india-map">
                  {/* Simplified India outline */}
                  <path
                    d="M 200 200 L 250 180 L 300 200 L 350 220 L 400 250 L 450 300 L 500 350 L 550 400 L 600 450 L 650 500 L 700 550 L 750 600 L 800 650 L 750 700 L 700 750 L 650 800 L 600 850 L 550 900 L 500 950 L 450 1000 L 400 1050 L 350 1100 L 300 1120 L 250 1100 L 200 1050 L 180 1000 L 170 950 L 180 900 L 200 850 L 220 800 L 240 750 L 250 700 L 240 650 L 220 600 L 210 550 L 200 500 L 190 450 L 200 400 L 210 350 L 200 300 Z"
                    fill="rgba(66, 165, 245, 0.1)"
                    stroke="rgba(66, 165, 245, 0.5)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="map-overlay">
                <div className="map-icon">📍</div>
                <h3>India</h3>
                <p>Carbon restoration projects across India</p>
                <div className="map-stats">
                  <div className="map-stat">
                    <span className="map-stat-value">{totalProjects}</span>
                    <span className="map-stat-label">Projects</span>
                  </div>
                  <div className="map-stat">
                    <span className="map-stat-value">{totalCarbonRestored.toLocaleString()}</span>
                    <span className="map-stat-label">CFT Restored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section-main">
          <h2>Analytics</h2>
          <Charts data={chartData} />
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="projects-section">
        <div className="section-header">
          <h2>Recent Projects</h2>
        </div>
        {projects.length > 0 ? (
          <div className="projects-grid">
            {projects.slice(0, 6).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No projects yet. Start by submitting your first project!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

