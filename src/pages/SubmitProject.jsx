import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import UploadForm from '../components/UploadForm'
import './SubmitProject.css'

function SubmitProject() {
  const navigate = useNavigate()
  const { addProject } = useApp()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    beforeImage: null,
    afterImage: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileSelect = (file, type) => {
    setFormData(prev => ({ ...prev, [type]: file }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.afterImage) {
      alert('Please upload an AFTER image')
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const projectId = addProject({
      name: formData.name || 'Untitled Project',
      description: formData.description,
      beforeImage: formData.beforeImage ? {
        name: formData.beforeImage.name,
        size: formData.beforeImage.size
      } : null,
      afterImage: {
        name: formData.afterImage.name,
        size: formData.afterImage.size
      },
      status: 'pending'
    })

    setIsSubmitting(false)
    
    // Navigate to analysis page with project ID
    navigate(`/analysis?projectId=${projectId}`)
  }

  return (
    <div className="submit-project-page">
      <div className="page-header">
        <h1>Submit Project</h1>
        <p>Upload your carbon footprint data for analysis and tokenization</p>
      </div>

      <div className="submit-form-container">
        <form onSubmit={handleSubmit} className="submit-form">
          <div className="form-section">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter project name"
              className="form-input"
            />
          </div>

          <div className="form-section">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your project..."
              rows="4"
              className="form-textarea"
            />
          </div>

          <div className="form-section">
            <label>Before Image (Baseline Reference)</label>
            <p className="form-hint">Used for audit trail only - not analyzed</p>
            <UploadForm
              onFileSelect={(file) => handleFileSelect(file, 'beforeImage')}
              selectedFile={formData.beforeImage}
              accept="image/*"
            />
          </div>

          <div className="form-section">
            <label>After Image *</label>
            <p className="form-hint">This image will be analyzed for vegetation detection</p>
            <UploadForm
              onFileSelect={(file) => handleFileSelect(file, 'afterImage')}
              selectedFile={formData.afterImage}
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!formData.afterImage || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              <>
                <span>🚀</span>
                Submit Project
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SubmitProject

