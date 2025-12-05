import React from 'react'
import githubLogo from '../assets/github.png'
import linkedinLogo from '../assets/linkedin.png'
import instagramLogo from '../assets/instagram.png'

function Footer() {

return (
     <footer className=" text-black p-2  text-center">
        
        <div className="container mx-auto">
            <hr className="border-t border-gray-300 mb-4" />
            <p> Voting App. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <img src={githubLogo} alt="GitHub" className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinLogo} alt="LinkedIn" className="h-6 w-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagramLogo } alt="Instagram" className="h-6 w-6" />
                </a>
            </div>
        </div>
    </footer>
)
}

export default Footer