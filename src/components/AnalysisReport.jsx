import Tooltip from './Tooltip'
import './AnalysisReport.css'

function AnalysisReport({ analysis, isLoading, project }) {
  if (isLoading) {
    return (
      <div className="analysis-report loading">
        <div className="loading-spinner"></div>
        <p>Analyzing data...</p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="analysis-report empty">
        <p>No analysis data available</p>
      </div>
    )
  }

  return (
    <div className="analysis-report">
      <div className="report-header">
        <h3>AI Analysis Report</h3>
        {analysis.confidence && (
          <span className="confidence-badge">
            {analysis.confidence}% Confidence
          </span>
        )}
      </div>

      <div className="report-main-metrics">
        <div className="metric-card primary">
          <div className="metric-label">Biomass Detected</div>
          <div className="metric-value">
            {analysis.biomassDetected || '0'} <span className="unit">tons</span>
          </div>
          {analysis.hasVegetation ? (
            <div className="metric-status positive">✓ Vegetation Detected</div>
          ) : (
            <div className="metric-status negative">✗ No Vegetation</div>
          )}
        </div>

        <div className="metric-card">
          <div className="metric-label">Carbon Restored</div>
          <div className="metric-value">
            {analysis.carbonRestored || 0} <span className="unit">CFT</span>
          </div>
          <div className="metric-subtext">
            {analysis.carbonRestored > 0 
              ? 'Carbon credits generated' 
              : 'No carbon restoration detected'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Confidence Score</div>
          <div className="score-circle">
            <span>{analysis.confidence || 'N/A'}</span>
          </div>
          <div className="metric-subtext">Analysis Accuracy</div>
        </div>
      </div>

      {analysis.afterImageName && (
        <div className="image-info-section">
          <h4>Analysis Details</h4>
          <div className="info-item">
            <span className="info-label">Analyzed Image:</span>
            <span className="info-value">{analysis.afterImageName}</span>
          </div>
          {analysis.hasVegetation !== undefined && (
            <div className={`vegetation-details ${!analysis.hasVegetation ? 'no-vegetation' : ''}`}>
              <p className="vegetation-message">
                {analysis.hasVegetation ? (
                  <>
                    ✓ Green vegetation successfully detected in the AFTER image. 
                    Carbon restoration credits have been generated.
                  </>
                ) : (
                  <>
                    ✗ No significant vegetation detected. The land appears unchanged from baseline.
                    No carbon credits generated.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {project && (project.ipfsCID || project.nftTokenId) && (
        <div className="verification-section">
          <h4>Verification & Immutability</h4>
          {project.ipfsCID && (
            <div className="verification-item">
              <Tooltip text="IPFS (InterPlanetary File System) is a decentralized storage protocol that stores data across multiple nodes. The CID (Content Identifier) is a unique hash that ensures data integrity and immutability. Once stored, the data cannot be altered without changing the CID.">
                <div className="verification-label">
                  <span>Stored on IPFS (CID)</span>
                  <span className="tooltip-icon">ℹ️</span>
                </div>
              </Tooltip>
              <div className="verification-value verified">
                <code>{project.ipfsCID}</code>
                <span className="verified-badge-small">✓ Immutable</span>
              </div>
            </div>
          )}
          {project.nftTokenId && (
            <div className="verification-item">
              <Tooltip text="The Proof-of-Restoration NFT is a blockchain token that serves as immutable proof of carbon restoration. It contains metadata linking to the IPFS-stored images and analysis, ensuring the restoration claim is permanently verifiable and cannot be tampered with.">
                <div className="verification-label">
                  <span>Proof-of-Restoration NFT</span>
                  <span className="tooltip-icon">ℹ️</span>
                </div>
              </Tooltip>
              <div className="verification-value verified">
                <code>#{project.nftTokenId}</code>
                <span className="verified-badge-small">✓ Verified</span>
              </div>
            </div>
          )}
        </div>
      )}

      {analysis.timestamp && (
        <div className="report-footer">
          <span>Analysis completed: {new Date(analysis.timestamp).toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}

export default AnalysisReport

