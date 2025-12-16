import { useState } from 'react'
import './UploadForm.css'

function UploadForm({ onFileSelect, selectedFile, accept = ".pdf,.doc,.docx,.txt,.csv,.json" }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      onFileSelect(file)
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div className="upload-form">
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
          {!selectedFile ? (
            <>
              <div className="upload-icon">{accept.includes('image') ? '🖼️' : '📄'}</div>
            <p className="upload-text">
              Drag and drop your file here, or{' '}
              <label className="upload-link">
                browse
                  <input
                    type="file"
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                    accept={accept}
                  />
              </label>
            </p>
            {accept.includes('image') ? (
              <p className="upload-hint">
                Supported formats: JPG, PNG, GIF, WEBP
              </p>
            ) : (
              <p className="upload-hint">
                Supported formats: PDF, DOC, DOCX, TXT, CSV, JSON
              </p>
            )}
          </>
          ) : (
            <div className="file-preview">
              <div className="file-icon">
                {selectedFile.type?.startsWith('image/') ? '🖼️' : '📄'}
              </div>
              {selectedFile.type?.startsWith('image/') && (
                <img 
                  src={URL.createObjectURL(selectedFile)} 
                  alt="Preview" 
                  className="image-preview"
                />
              )}
            <div className="file-info">
              <h4>{selectedFile.name}</h4>
              <p>{(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <button
              className="remove-file-btn"
              onClick={() => onFileSelect(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadForm

