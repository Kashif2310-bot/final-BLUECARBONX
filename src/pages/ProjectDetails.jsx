import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import AnalysisReport from '../components/AnalysisReport'
import Tooltip from '../components/Tooltip'
import './ProjectDetails.css'

function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProject } = useApp()
  
  const project = getProject(id)

  if (!project) {
    return (
      <div className="project-details-page">
        <div className="error-state">
          <p>Project not found</p>
          <button onClick={() => navigate('/')} className="back-btn">
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="project-details-page">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h1>{project.name || 'Untitled Project'}</h1>
        <p>{project.description || 'No description'}</p>
      </div>

      <div className="project-status-banner">
        <span className={`status-badge-large ${project.status}`}>
          {project.status}
        </span>
        <span className="project-date">Created: {formatDate(project.createdAt)}</span>
      </div>

      <div className="details-grid">
        <div className="details-section">
          <h2>Project Information</h2>
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">Project ID</span>
              <code className="info-value-code">{project.id}</code>
            </div>
            {project.beforeImage && (
              <div className="info-row">
                <span className="info-label">Before Image (Baseline)</span>
                <span className="info-value">{project.beforeImage.name}</span>
              </div>
            )}
            {project.afterImage && (
              <div className="info-row">
                <span className="info-label">After Image (Analyzed)</span>
                <span className="info-value highlight">{project.afterImage.name}</span>
              </div>
            )}
            {project.afterImage?.size && (
              <div className="info-row">
                <span className="info-label">After Image Size</span>
                <span className="info-value">{(project.afterImage.size / 1024).toFixed(2)} KB</span>
              </div>
            )}
            {project.carbonFootprint && (
              <div className="info-row">
                <span className="info-label">Carbon Footprint</span>
                <span className="info-value highlight">{project.carbonFootprint} tCO₂e</span>
              </div>
            )}
          </div>
        </div>

        {project.analysis && (
          <div className="details-section">
            <h2>AI Analysis</h2>
            <AnalysisReport analysis={project.analysis} project={project} />
          </div>
        )}

        {(project.ipfsCID || project.nftTokenId || project.cftAmount) && (
          <div className="details-section">
            <h2>Tokenization Details</h2>
            <div className="info-card">
              {project.ipfsCID && (
                <div className="info-row">
                  <span className="info-label">
                    <Tooltip text="IPFS (InterPlanetary File System) is a decentralized storage protocol that stores data across multiple nodes. The CID (Content Identifier) is a unique hash that ensures data integrity and immutability. Once stored, the data cannot be altered without changing the CID.">
                      <span className="info-label-with-tooltip">
                        Stored on IPFS (CID)
                        <span className="tooltip-icon">ℹ️</span>
                      </span>
                    </Tooltip>
                  </span>
                  <div className="hash-display verified" onClick={() => copyToClipboard(project.ipfsCID)}>
                    <code>{project.ipfsCID}</code>
                    <span className="verified-badge" title="Data is immutable and verified on IPFS">✓</span>
                    <button className="copy-btn-small">📋</button>
                  </div>
                </div>
              )}
              {project.nftTokenId && (
                <div className="info-row">
                  <span className="info-label">
                    <Tooltip text="The Proof-of-Restoration NFT is a blockchain token that serves as immutable proof of carbon restoration. It contains metadata linking to the IPFS-stored images and analysis, ensuring the restoration claim is permanently verifiable and cannot be tampered with.">
                      <span className="info-label-with-tooltip">
                        Proof-of-Restoration NFT
                        <span className="tooltip-icon">ℹ️</span>
                      </span>
                    </Tooltip>
                  </span>
                  <div className="nft-display verified">
                    <span className="info-value highlight">#{project.nftTokenId}</span>
                    <span className="verified-badge" title="NFT verified on blockchain">✓</span>
                  </div>
                </div>
              )}
              {project.nftTxHash && (
                <div className="info-row">
                  <span className="info-label">NFT Transaction</span>
                  <div className="hash-display" onClick={() => copyToClipboard(project.nftTxHash)}>
                    <code>{project.nftTxHash}</code>
                    <button className="copy-btn-small">📋</button>
                  </div>
                </div>
              )}
              {project.cftAmount && (
                <div className="info-row">
                  <span className="info-label">CFT Issued</span>
                  <span className="info-value highlight">{project.cftAmount.toLocaleString()} CFT</span>
                </div>
              )}
              {project.cftTxHash && (
                <div className="info-row">
                  <span className="info-label">CFT Transaction</span>
                  <div className="hash-display" onClick={() => copyToClipboard(project.cftTxHash)}>
                    <code>{project.cftTxHash}</code>
                    <button className="copy-btn-small">📋</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails

