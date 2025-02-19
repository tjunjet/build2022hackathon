import React from 'react';
import ReactDOM from 'react-dom';

export class MenuBar extends React.Component {
    render() {
        return (
            <nav className="menuBar navbar navbar-light bg-light navbar-expand fixed-top custom-sticky-nav">
                <div className="container col-8 px-4">  
                    <span className="navbar-brand mb-0 h1">The Winter Wear-ther Guide</span>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a 
                                href="https://github.com/tjunjet/winter_wear-ther_guide" 
                                className="nav-link" 
                                target="_blank"
                            >
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}