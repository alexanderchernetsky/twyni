import {useEffect, useState} from "react";
import {Input, DatePicker, Checkbox, Slider} from 'antd';
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import './App.css'
import googleLogo from './assets/google.svg'
import spotifyLogo from './assets/spotify.svg';
import appleLogo from './assets/apple.png';
import bookingLogo from './assets/booking.svg';

const getLogoForCompany = (company:string): string => {
    switch (company){
        case 'Google':
            return googleLogo;
        case 'Spotify':
            return spotifyLogo;
        case 'Apple':
            return appleLogo;
        case 'Booking':
            return bookingLogo;
        default:
            return googleLogo;
    }
}


const { Search } = Input;

const menuItems = [
    'Dashboard',
    'Find jobs',
    'Candidates',
    'Your jobs',
];

const columns = ['Company', 'Job title', 'Salary', 'Commission', 'Interview fee', 'Company score'];

interface ITile {
    id: number,
    companyLogo: string,
    jobTitle: string,
    location: string,
    badges: string[],
    salary: string,
    experience: number;
    commission: string,
    fee: string,
    score: string,
    isLiked: boolean,
}

const tiles: ITile[] = [
    {
        id: 1,
        companyLogo: 'Google',
        jobTitle: 'Front-end Engineer',
        location: 'London',
        experience: 7,
        badges: ['React', 'JavaScript', 'HTML'],
        salary: '$55000 - $90000',
        commission: '$3500',
        fee: '$3500',
        score: '5.0 / 5',
        isLiked: true
    },
    {
        id: 2,
        companyLogo: 'Booking',
        jobTitle: 'Back-end Engineer',
        location: 'Manchester',
        experience: 5,
        badges: ['Node.js', 'AWS', 'Docker'],
        salary: '$55000 - $90000',
        commission: '$3500',
        fee: '$3500',
        score: '4.0 / 5',
        isLiked: false
    },
    {
        id: 3,
        companyLogo: 'Spotify',
        jobTitle: 'Full-stack Engineer',
        location: 'Liverpool',
        experience: 10,
        badges: ['Angular', 'Java'],
        salary: '$100000 - $120000',
        commission: '$6000',
        fee: '$6000',
        score: '3.0 / 5',
        isLiked: false
    },
    {
        id: 4,
        companyLogo: 'Apple',
        jobTitle: 'Designer',
        location: 'Birmingham',
        experience: 2,
        badges: ['Figma', 'Canva', 'Photoshop'],
        salary: '$40000 - $60000',
        commission: '$3500',
        fee: '$3500',
        score: '2.0 / 5',
        isLiked: false
    },
    {
        id: 5,
        companyLogo: 'Google',
        jobTitle: 'Social Media Manager',
        location: 'London',
        experience: 1,
        badges: ['Content Management', 'SEO', 'Jira'],
        salary: '$35000 - $45000',
        commission: '$1500',
        fee: '$1500',
        score: '3.5 / 5',
        isLiked: false
    }
];

const initialLocationCheckboxesState: Record<string, boolean> =
    {
        London: false,
        Manchester: false,
        Liverpool: false,
        Birmingham: false,
    }
;

const locationsFilters = tiles.map(tile => tile.location);

const experienceFilters = [
    '0-2',
    '4-6',
    '6-10'
];

const initialExperienceCheckboxesState: Record<string, boolean> = {
    ['0-2']: false,
    ['4-6']: false,
    ['6-10']: false,
};

function App() {
    const [jobs, setJobs] = useState(tiles);
    const [searchResults, setSearchResults] = useState(tiles);
    const [locationCheckboxes, setLocationCheckboxes] = useState(initialLocationCheckboxesState);
    const [experienceCheckboxes, setExperienceCheckboxes] = useState(initialExperienceCheckboxesState);

    const onSearch = (input: string) => {
        setSearchResults(() => {
            if (!input) {
                return jobs;
            }

            return jobs.filter(job => {
                return job.jobTitle.toLowerCase().includes(input.toLowerCase()) || job.badges.some(badge => badge.toLowerCase().includes(input.toLowerCase()));
            });
        })
    };

    useEffect(() => {
        let filteredResults = [...jobs];

        const isAtLeastOneLocationCheckboxEnabled = locationCheckboxes.London || locationCheckboxes.Manchester || locationCheckboxes.Liverpool || locationCheckboxes.Birmingham;
        if (isAtLeastOneLocationCheckboxEnabled) {
            filteredResults = filteredResults.filter(tile => Boolean(locationCheckboxes[tile.location]))
        }

        const isAtLeastOneSearchCheckboxEnabled = experienceCheckboxes['0-2'] || experienceCheckboxes['4-6'] || experienceCheckboxes['6-10'];
        if (isAtLeastOneSearchCheckboxEnabled) {
            let res1: ITile[] = [];
            let res2: ITile[] = [];
            let res3: ITile[] = [];
            if (experienceCheckboxes['0-2']) {
                res1 = ([...filteredResults].filter(tile => tile.experience >= 0 && tile.experience <= 2));
            }
            if (experienceCheckboxes['4-6']) {
                res2 = (filteredResults.filter(tile => tile.experience >= 4 && tile.experience <= 6));
            }
            if (experienceCheckboxes['6-10']) {
                res3 = (filteredResults.filter(tile => tile.experience >= 6 && tile.experience <= 10));
            }
            filteredResults = [...res1, ...res2, ...res3];
        }

        setSearchResults(() => filteredResults);
    }, [locationCheckboxes, experienceCheckboxes]);


    const onDatePickerChange = () => {
        // todo
    }

    const onLocationCheckboxChange = (event: CheckboxChangeEvent, location: string) => {
        const updated = {
            ...locationCheckboxes,
            [location]: event.target.checked
        }

        setLocationCheckboxes(() => updated);
    }

    const onCheckboxChange = () => {
        // todo
    }

    const onExperienceCheckboxChange = (event: CheckboxChangeEvent, exp: string) => {
        const updated = {
            ...experienceCheckboxes,
            [exp]: event.target.checked
        }

        setExperienceCheckboxes(() => updated);
    }

    const onHeartClick = (id: number) => {
        setJobs(prevState => {
            const updated = prevState.map(tile => {
                if (tile.id === id) {
                    const isLiked = !tile.isLiked;
                    return {...tile, isLiked: isLiked};
                }

                return tile;
            })

            return updated;
        })

        setSearchResults(prevState => {
            const updated = prevState.map(tile => {
                if (tile.id === id) {
                    const isLiked = !tile.isLiked;
                    return {...tile, isLiked: isLiked};
                }

                return tile;
            })

            return updated;
        })
    }

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
        <main className="main-content-wrapper">
            <div className="side-bar">
                <h2>Filters</h2>
                <div className="filters">
                    <div className="filter-title">Date published</div>
                    <DatePicker size="large" style={{width: '100%'}} onChange={onDatePickerChange}/>
                    <div className="filter-title">Location</div>
                    <div className="location-checkboxes">
                        {[...new Set(locationsFilters)].map((location, index) => <Checkbox key={index} className="checkbox" onChange={(event) => onLocationCheckboxChange(event, location)}>{location}</Checkbox>)}
                    </div>
                    <div className="filter-title">Salary</div>
                    <Slider range={{draggableTrack: true}} min={0} max={200000} defaultValue={[0, 200000]}/>
                    <div className="filter-title">Years of experience</div>
                    <div className="location-checkboxes">
                        {experienceFilters.map(exp => <Checkbox key={exp} className="checkbox" onChange={(event) => onExperienceCheckboxChange(event, exp)}>{exp} years</Checkbox>)}
                    </div>
                    <div className="filter-title">Employment type</div>
                    <div className="location-checkboxes">
                        {/* todo: logic and mapping */}
                        <Checkbox className="checkbox" onChange={onCheckboxChange}>Full time</Checkbox>
                        <Checkbox className="checkbox" onChange={onCheckboxChange}>Part time</Checkbox>
                        <Checkbox className="checkbox" onChange={onCheckboxChange}>Contract</Checkbox>
                    </div>
                </div>
            </div>
            <div className="content">
                <h1>Find jobs</h1>
                <div className="search-wrapper">
                    <Search placeholder="Search for jobs" onSearch={onSearch} size="large" style={{width: 420}}/>
                </div>
                <div className="column-names">{columns.map((col, index) => <div className="column"
                                                                                key={index}>{col}</div>)}</div>
                <div className="tiles-wrapper">
                    {searchResults.length > 0 && searchResults.map((tile) => {
                        const logo = getLogoForCompany(tile.companyLogo);
                        return (
                            <div key={tile.id} className="tile">
                                <div><img src={logo} alt="company-logo"/></div>
                                <div className="job-title-wrapper">
                                    <div className="job-title">{tile.jobTitle} ({tile.location})</div>
                                    <div className="badges-wrapper">
                                        <div className="badge">{tile.experience} years</div>
                                        {tile.badges.map((badge, index) => <div className="badge"
                                                                                key={index}>{badge}</div>)}
                                    </div>
                                </div>
                                <div className="salary">{tile.salary}</div>
                                <div className="commission">{tile.commission}</div>
                                <div className="commission">{tile.fee}</div>
                                <div className="score">{tile.score}</div>
                                <div className="like-wrapper" onClick={() => onHeartClick(tile.id)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M21.6328 6.64689C21.3187 5.91948 20.8657 5.2603 20.2992 4.70627C19.7323 4.15058 19.064 3.70898 18.3305 3.40549C17.5699 3.08953 16.7541 2.92781 15.9305 2.9297C14.775 2.9297 13.6477 3.24611 12.668 3.84377C12.4336 3.98674 12.2109 4.14377 12 4.31486C11.7891 4.14377 11.5664 3.98674 11.332 3.84377C10.3523 3.24611 9.225 2.9297 8.06953 2.9297C7.2375 2.9297 6.43125 3.08908 5.66953 3.40549C4.93359 3.71017 4.27031 4.14845 3.70078 4.70627C3.13359 5.25968 2.6805 5.91901 2.36719 6.64689C2.04141 7.40392 1.875 8.20783 1.875 9.03517C1.875 9.81564 2.03438 10.6289 2.35078 11.4563C2.61563 12.1477 2.99531 12.8649 3.48047 13.5891C4.24922 14.7352 5.30625 15.9305 6.61875 17.1422C8.79375 19.1508 10.9477 20.5383 11.0391 20.5946L11.5945 20.9508C11.8406 21.1078 12.157 21.1078 12.4031 20.9508L12.9586 20.5946C13.05 20.536 15.2016 19.1508 17.3789 17.1422C18.6914 15.9305 19.7484 14.7352 20.5172 13.5891C21.0023 12.8649 21.3844 12.1477 21.6469 11.4563C21.9633 10.6289 22.1227 9.81564 22.1227 9.03517C22.125 8.20783 21.9586 7.40392 21.6328 6.64689V6.64689ZM12 19.0969C12 19.0969 3.65625 13.7508 3.65625 9.03517C3.65625 6.64689 5.63203 4.71095 8.06953 4.71095C9.78281 4.71095 11.2688 5.6672 12 7.06408C12.7313 5.6672 14.2172 4.71095 15.9305 4.71095C18.368 4.71095 20.3438 6.64689 20.3438 9.03517C20.3438 13.7508 12 19.0969 12 19.0969Z"
                                            fill={tile.isLiked ? 'red' : 'black'} fill-opacity="0.45"/>
                                    </svg>
                                </div>
                            </div>
                        )
                    })}

                    {searchResults.length === 0 && (
                        <div className="no-results-placeholder">No results found.</div>
                    )}
                </div>
            </div>
        </main>
    </div>
  )
}

export default App
