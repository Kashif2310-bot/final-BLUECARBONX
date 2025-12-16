import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('bluecarbon-projects')
    return saved ? JSON.parse(saved) : []
  })

  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem('bluecarbon-wallet')
    return saved ? JSON.parse(saved) : {
      balance: 0,
      address: '0x' + Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join(''),
      transactions: []
    }
  })

  useEffect(() => {
    localStorage.setItem('bluecarbon-projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('bluecarbon-wallet', JSON.stringify(wallet))
  }, [wallet])

  const addProject = (project) => {
    const newProject = {
      id: Date.now().toString(),
      ...project,
      createdAt: new Date().toISOString(),
      status: 'pending'
    }
    setProjects(prev => [newProject, ...prev])
    return newProject.id
  }

  const updateProject = (id, updates) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ))
  }

  const getProject = (id) => {
    return projects.find(p => p.id === id)
  }

  const addTransaction = (transaction) => {
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + (transaction.amount || 0),
      transactions: [transaction, ...prev.transactions]
    }))
  }

  const value = {
    projects,
    wallet,
    addProject,
    updateProject,
    getProject,
    addTransaction
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

