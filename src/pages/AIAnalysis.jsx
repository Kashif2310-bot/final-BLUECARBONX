import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import AnalysisReport from '../components/AnalysisReport'
import './AIAnalysis.css'

function AIAnalysis() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getProject, updateProject, addTransaction } = useApp()
  
  const projectId = searchParams.get('projectId')
  const project = projectId ? getProject(projectId) : null
  
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (project && project.analysis) {
      setAnalysis(project.analysis)
    } else if (project && !project.analysis) {
      startAnalysis()
    }
  }, [project])

  const detectVegetation = (fileName) => {
    // Simulate vegetation detection based on filename or random
    const fileNameLower = fileName?.toLowerCase() || ''
    const vegetationKeywords = ['green', 'vegetation', 'forest', 'tree', 'plant', 'grass', 'after', 'restored']
    
    // Check filename for vegetation keywords
    const hasKeyword = vegetationKeywords.some(keyword => fileNameLower.includes(keyword))
    
    // 80% chance of vegetation if keyword found, 30% chance if not
    return hasKeyword ? Math.random() > 0.2 : Math.random() > 0.7
  }

  const startAnalysis = async () => {
    if (!project) return

    setIsAnalyzing(true)
    updateProject(project.id, { status: 'analyzing' })

    // Simulate AI analysis with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Generate analysis after delay
    setTimeout(() => {
      const afterImageName = project.afterImage?.name || ''
      const hasVegetation = detectVegetation(afterImageName)
      
      // Generate carbon value based on vegetation detection
      const carbonRestored = hasVegetation 
        ? Math.floor(Math.random() * 181 + 120) // 120-300 CFT
        : 0
      
      const biomassDetected = hasVegetation 
        ? (Math.random() * 50 + 20).toFixed(1) // 20-70 tons
        : 0
      
      const confidence = (Math.random() * 10 + 85).toFixed(1) // 85-95%

      const mockAnalysis = {
        biomassDetected: biomassDetected,
        carbonRestored: carbonRestored,
        confidence: confidence,
        hasVegetation: hasVegetation,
        afterImageName: afterImageName,
        timestamp: new Date().toISOString()
      }

      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
      
      // Generate IPFS CID (proper format: QmX8...)
      const generateIPFSCID = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let cid = 'Qm'
        // First few chars are more varied
        cid += ['X', 'Y', 'Z', 'A', 'B', 'C'][Math.floor(Math.random() * 6)]
        cid += Math.floor(Math.random() * 10)
        // Rest of CID
        for (let i = 0; i < 40; i++) {
          cid += chars[Math.floor(Math.random() * chars.length)]
        }
        return cid
      }
      
      const ipfsCID = generateIPFSCID()
      
      // Generate NFT Token ID in format: BCX-2025-XXX
      const generateNFTTokenId = () => {
        const year = new Date().getFullYear()
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
        return `BCX-${year}-${randomNum}`
      }
      
      const nftTokenId = generateNFTTokenId()

      updateProject(project.id, {
        analysis: mockAnalysis,
        carbonFootprint: (carbonRestored / 10).toFixed(2), // Convert CFT to tCO₂e for compatibility
        cftAmount: carbonRestored,
        ipfsCID,
        nftTokenId,
        status: 'completed'
      })
      clearInterval(interval)
    }, 2500)
  }

  const handleContinue = () => {
    if (project && analysis && analysis.carbonRestored > 0) {
      // Generate transaction hashes for NFT and CFT
      const nftTxHash = '0x' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')
      
      const cftTxHash = '0x' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')

      updateProject(project.id, {
        nftTxHash,
        cftTxHash
      })

      addTransaction({
        type: 'CFT_ISSUED',
        amount: analysis.carbonRestored,
        timestamp: new Date().toISOString(),
        projectId: project.id
      })

      navigate(`/project/${project.id}`)
    } else if (project && analysis && analysis.carbonRestored === 0) {
      // Still navigate to project details even if no CFT issued
      navigate(`/project/${project.id}`)
    }
  }

  if (!project) {
    return (
      <div className="analysis-page">
        <div className="error-state">
          <p>Project not found. Please submit a project first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="analysis-page">
      <div className="page-header">
        <h1>AI Analysis</h1>
        <p>Analyzing AFTER image for vegetation detection and carbon restoration</p>
      </div>

      {project.beforeImage && (
        <div className="audit-notice">
          <p>
            <strong>Note:</strong> Before image is used for baseline reference in real deployments. 
            Only the AFTER image is analyzed for vegetation detection.
          </p>
        </div>
      )}

      {isAnalyzing && (
        <div className="progress-section">
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="progress-text">{Math.min(Math.round(progress), 100)}% Complete</p>
        </div>
      )}

      <AnalysisReport analysis={analysis} isLoading={isAnalyzing} project={project} />

      {analysis && !isAnalyzing && (
        <div className="action-section">
          <button className="continue-btn" onClick={handleContinue}>
            {analysis.carbonRestored > 0 
              ? 'Continue to Tokenization →' 
              : 'View Project Details →'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AIAnalysis

