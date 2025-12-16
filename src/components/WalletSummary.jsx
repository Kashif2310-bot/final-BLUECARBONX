import './WalletSummary.css'

function WalletSummary({ wallet }) {
  const formatAddress = (address) => {
    if (!address) return 'N/A'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address)
      alert('Address copied to clipboard!')
    }
  }

  return (
    <div className="wallet-summary">
      <div className="wallet-header">
        <h3>Wallet Summary</h3>
        <span className="network-badge">Ethereum Mainnet</span>
      </div>

      <div className="wallet-address-section">
        <div className="address-label">Wallet Address</div>
        <div className="address-display" onClick={copyAddress}>
          <code>{formatAddress(wallet?.address)}</code>
          <button className="copy-btn" title="Copy full address">
            📋
          </button>
        </div>
      </div>

      <div className="wallet-balance">
        <div className="balance-label">Total Balance</div>
        <div className="balance-amount">
          {wallet?.balance?.toLocaleString() || 0} <span className="balance-symbol">CFT</span>
        </div>
        <div className="balance-subtext">Carbon Footprint Tokens</div>
      </div>

      {wallet?.transactions && wallet.transactions.length > 0 && (
        <div className="recent-transactions">
          <h4>Recent Transactions</h4>
          <div className="transactions-list">
            {wallet.transactions.slice(0, 3).map((tx, index) => (
              <div key={index} className="transaction-item">
                <div className="tx-icon">
                  {tx.amount > 0 ? '🪙' : '📤'}
                </div>
                <div className="tx-details">
                  <div className="tx-type">{tx.type || 'Transaction'}</div>
                  <div className="tx-time">
                    {tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'N/A'}
                  </div>
                </div>
                <div className={`tx-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount?.toLocaleString() || 0} CFT
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletSummary

