import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-950 w-[100%] py-6">
            <div className="container mx-auto text-center">
                {/* Text Logo */}
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">JobHunt</h1>
                </div>

                {/* Copyright Text */}
                <p className="text-gray-900 mb-4">
                    © 2024 YourWebsite. All rights reserved.
                </p>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <FacebookIcon />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <XIcon />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                        <LinkedInIcon />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
