import React, { useRef } from 'react';
import '../CssFile/Carousel.css'; // Import custom CSS for scrollbar
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jobSliceActions } from '../../redux/jobSlice';

const Slider = () => {
    const sliderRef = useRef(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const posts = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "UI/UX Design",
        "Full Stack Developer",
        "Machine Learning"
    ];

    const searchJobHandler = (query) => {
        dispatch(jobSliceActions.setSearchQuery(query))
        navigate("/browse")
    }

    // Function to handle scrolling
    const handleScroll = (direction) => {
        const slider = sliderRef.current;
        const scrollAmount = 150; // Adjust as needed

        if (direction === "left") {
            slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative flex items-center m-auto my-12 bg-gray-100 sm:w-[690px] w-[275px] sm:h-[50px] overflow-hidden rounded-lg">
            <button
                className="absolute left-0 top-0 bottom-0 bg-gray-100 text-black p-2 rounded-l-md  flex items-center justify-center z-10"
                onClick={() => handleScroll("left")}
            >
                &lt;
            </button>
            <div
                className="flex overflow-x-auto scroll-smooth w-full whitespace-nowrap ml-16 mr-16 custom-scrollbar"
                ref={sliderRef}
            >
                {posts.map((post, index) => (
                    <button
                        onClick={() => searchJobHandler(post)}
                        key={index}
                        className="bg-gray-200 text-black p-2 px-4 mx-16 rounded-md "
                    >
                        {post}
                    </button>
                ))}
            </div>
            <button
                className="absolute right-0 top-0 bottom-0 bg-gray-100 text-black p-2 rounded-r-md  flex items-center justify-center z-10"
                onClick={() => handleScroll("right")}
            >
                &gt;
            </button>
        </div>
    );
};

export default Slider;
