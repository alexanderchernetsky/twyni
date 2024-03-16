import { Input } from 'antd';
import './App.css'

import googleLogo from './assets/google.svg'
import heart from './assets/heart.svg'


const { Search } = Input;

const menuItems = [
    'Dashboard',
    'Find jobs',
    'Candidates',
    'Your jobs',
];

const columns = ['Company', 'Job title', 'Salary', 'Comission', 'Interview fee', 'Company score'];

const tiles = [
    {
        companyLogo: 'Google',
        jobTitle: 'Front-end Engineer',
        badges: ['7 years', 'React', 'JavaScript', 'HTML'],
        salary: '$55000 - $90000',
        commission: '$3500',
        fee: '$3500',
        score: '4.0 / 5',
        isLiked: true
    },
    {
        companyLogo: 'Google',
        jobTitle: 'Back-end Engineer',
        badges: ['5 years', 'Node.js', 'AWS', 'Docker'],
        salary: '$55000 - $90000',
        commission: '$3500',
        fee: '$3500',
        score: '3.0 / 5',
        isLiked: false
    },
    {
        companyLogo: 'Google',
        jobTitle: 'Back-end Engineer',
        badges: ['5 years', 'Node.js', 'AWS'],
        salary: '$55000 - $90000',
        commission: '$3500',
        fee: '$3500',
        score: '3.0 / 5',
        isLiked: false
    },
]

function App() {
        const onSearch = () => {};

  return (
    <div className="home-page-container">
        <header className="app-header">
            <div className="logo">
                <div className="logo-circle"></div>
                <div className="logo-title">Twyni</div>
            </div>
            <div className="menu-items">
                {menuItems.map((item, index) =>  {
                    const isSelected = item === 'Find jobs';
                    return (
                        <div key={index} className={`menu-item ${isSelected ? 'menu-item-selected' : ''}`}>{item}</div>
                        )
                })}
            </div>
        </header>
        <div className="separator"/>
        <main className="main-content-wrapper">
            <div className="side-bar"/>
            <div className="content">
                <h1>Find jobs</h1>
                <div className="search-wrapper">
                    <Search placeholder="Search for jobs" onSearch={onSearch} size="large" style={{width: 420}}/>
                </div>
                <div className="column-names">{columns.map((col, index) => <div className="column" key={index}>{col}</div>)}</div>
                <div className="tiles-wrapper">
                    {tiles.map((tile, index) => {
                        return (
                            <div key={index} className="tile">
                                <div><img src={googleLogo} alt="company-logo"/></div>
                                <div className="job-title-wrapper">
                                    <div className="job-title">{tile.jobTitle}</div>
                                    <div className="badges-wrapper">{tile.badges.map((badge, index) => <div className="badge" key={index}>{badge}</div>)}</div>
                                </div>
                                <div className="salary">{tile.salary}</div>
                                <div className="commission">{tile.commission}</div>
                                <div className="commission">{tile.fee}</div>
                                <div className="score">{tile.score}</div>
                                <div className="like-wrapper"><img src={heart} alt="like"/></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    </div>
  )
}

export default App
