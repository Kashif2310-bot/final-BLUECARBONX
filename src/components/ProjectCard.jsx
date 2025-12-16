import { Link } from 'react-router-dom'
import './ProjectCard.css'

function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#66bb6a'
      case 'analyzing':
        return '#ffa726'
      case 'pending':
        return '#64b5f6'
      default:
        return '#64b5f6'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Link to={`/project/${project.id}`} className="project-card">
      <div className="project-card-header">
        <h3>{project.name || 'Untitled Project'}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(project.status) + '20', color: getStatusColor(project.status) }}
        >
          {project.status}
        </span>
      </div>

      {project.description && (
        <p className="project-description">{project.description}</p>
      )}

      <div className="project-stats">
        {project.carbonFootprint && (
          <div className="stat-item">
            <span className="stat-label">Carbon Footprint</span>
            <span className="stat-value">{project.carbonFootprint} tCO₂e</span>
          </div>
        )}
        {project.cftAmount && (
          <div className="stat-item">
            <span className="stat-label">CFT Issued</span>
            <span className="stat-value">{project.cftAmount.toLocaleString()} CFT</span>
          </div>
        )}
      </div>

      <div className="project-footer">
        <span className="project-date">{formatDate(project.createdAt)}</span>
        {project.nftTokenId && (
          <span className="nft-badge">NFT #{project.nftTokenId}</span>
        )}
      </div>
    </Link>
  )
}

export default ProjectCard

