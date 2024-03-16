import React from 'react'
import './App.css'

const menuItems = [
    'Dashboard',
    'Find jobs',
    'Candidates',
    'Your jobs',
]

function App() {
  return (
    <div className="home-page-container">
        <header className="app-header">
            <div className="logo">
                <div className="logo-circle"></div>
                <div className="logo-title">Twyni</div>
            </div>
            <div className="menu-items">
                {menuItems.map(item =>  {
                    const isSelected = item === 'Find jobs';
                    return (
                        <div className={`menu-item ${isSelected ? 'menu-item-selected' : ''}`}>{item}</div>
                        )
                })}
            </div>
        </header>
        <div className="separator"/>
    </div>
  )
}

export default App
