import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'
import './CommunityWallet.css'

function CommunityWallet() {
  const { wallet, projects } = useApp()

  const formatAddress = (address) => {
    if (!address) return 'N/A'
    return `${address.slice(0, 10)}...${address.slice(-8)}`
  }

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address)
      alert('Address copied to clipboard!')
    }
  }

  // Calculate total CFT from all projects (accumulated)
  const totalCFTFromProjects = projects.reduce((sum, project) => {
    return sum + (project.cftAmount || 0)
  }, 0)

  // Get projects with CFT issued
  const projectsWithCFT = projects
    .filter(p => p.cftAmount && p.cftAmount > 0)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  // Get recent transactions (only credit transactions)
  const recentTransactions = wallet.transactions
    ?.filter(tx => tx.amount > 0)
    .slice(0, 10) || []

  return (
    <div className="wallet-page">
      <div className="page-header">
        <h1>Community Wallet</h1>
        <p>Community-controlled wallet for Carbon Footprint Tokens</p>
        <div className="community-badge">
          <span className="badge-icon">👥</span>
          <span>Community-Controlled Wallet</span>
        </div>
      </div>

      <div className="wallet-content">
        {/* Total Balance Card */}
        <div className="balance-card-main">
          <div className="balance-header">
            <h2>Total CFT Balance</h2>
            <span className="token-symbol">CFT</span>
          </div>
          <div className="balance-amount-large">
            {totalCFTFromProjects.toLocaleString()}
          </div>
          <p className="balance-description">
            Accumulated from all projects with carbon restoration
          </p>
        </div>

        {/* Wallet Address Card */}
        <div className="wallet-address-card">
          <h3>Wallet Address</h3>
          <div className="address-display-full" onClick={copyAddress}>
            <code>{wallet.address || 'N/A'}</code>
            <button className="copy-btn" title="Copy full address">
              📋
            </button>
          </div>
          <div className="wallet-info-grid">
            <div className="info-item-small">
              <span className="info-label-small">Network</span>
              <span className="info-value-small">Ethereum Mainnet</span>
            </div>
            <div className="info-item-small">
              <span className="info-label-small">Token Standard</span>
              <span className="info-value-small">ERC-20</span>
            </div>
            <div className="info-item-small">
              <span className="info-label-small">Token Symbol</span>
              <span className="info-value-small highlight">CFT</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        {recentTransactions.length > 0 && (
          <div className="transactions-section">
            <h3>Recent Credit Transactions</h3>
            <div className="transactions-list">
              {recentTransactions.map((tx, index) => {
                const project = projects.find(p => p.id === tx.projectId)
                return (
                  <div key={index} className="transaction-row">
                    <div className="tx-main">
                      <div className="tx-icon-large">🪙</div>
                      <div className="tx-info">
                        <div className="tx-type">{tx.type || 'CFT Issued'}</div>
                        <div className="tx-time">
                          {tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'N/A'}
                        </div>
                        {project && (
                          <Link to={`/project/${project.id}`} className="tx-project-link">
                            Project: {project.name || 'Untitled Project'}
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="tx-amount-large positive">
                      +{tx.amount?.toLocaleString() || 0} CFT
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Project-wise Breakdown */}
        {projectsWithCFT.length > 0 && (
          <div className="projects-breakdown-section">
            <h3>Project-wise Breakdown</h3>
            <p className="section-description">
              CFT tokens accumulated from each project with verified carbon restoration
            </p>
            <div className="projects-breakdown-list">
              {projectsWithCFT.map(project => (
                <Link 
                  key={project.id} 
                  to={`/project/${project.id}`}
                  className="project-breakdown-item"
                >
                  <div className="project-breakdown-header">
                    <h4>{project.name || 'Untitled Project'}</h4>
                    <span className="project-cft-amount">
                      {project.cftAmount.toLocaleString()} CFT
                    </span>
                  </div>
                  <div className="project-breakdown-details">
                    <span className="project-date-small">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    {project.nftTokenId && (
                      <span className="nft-badge-small">
                        NFT #{project.nftTokenId}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {projectsWithCFT.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">💼</div>
            <h3>No CFT Tokens Yet</h3>
            <p>Submit projects with verified carbon restoration to start accumulating CFT tokens.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommunityWallet

