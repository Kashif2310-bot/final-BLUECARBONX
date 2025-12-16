import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SubmitProject from './pages/SubmitProject'
import AIAnalysis from './pages/AIAnalysis'
import CommunityWallet from './pages/CommunityWallet'
import ProjectDetails from './pages/ProjectDetails'
import './App.css'

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitProject />} />
            <Route path="/analysis" element={<AIAnalysis />} />
            <Route path="/wallet" element={<CommunityWallet />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}

export default App

