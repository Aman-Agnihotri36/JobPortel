import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'

import Slider from './shared/Slider'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Chatbot from './Chatbot'

function Home() {

    useGetAllJobs()

    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.role == 'recruiter') {
            navigate('/admin/companies')
        }
    }, [])
    return (
        <div className='w-full'>
            <Navbar />

            <HeroSection />
            <Slider />
            <Chatbot />
            <LatestJob />

            <Footer />
        </div>
    )
}

export default Home
