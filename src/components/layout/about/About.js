import React from 'react';
import Navbar from '../landing/Navbar';
import './About.css';
export const About = () => {
  return (
    <div >
      <Navbar />
      <div className="about">
        <h1>Technologies used </h1>
        <div className="techs">
          <div>
            <h3>Front-end</h3>
            <ul>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>React/Redux</li>
            </ul>
          </div>
          <div>
            <h3>Back-end</h3>
            <div>
              <ul>
                <li>Node JS</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>Mongoose</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
