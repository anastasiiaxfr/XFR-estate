import { useState, useRef, useEffect } from 'react'
import './Hero.sass'
import { filterOptions } from '../../data'
import { FaChevronCircleDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function Hero() {
    const [activeBtn, setActiveBtn] = useState("buy");
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(
        filterOptions.map((filter) => filter.options[0])
    );
    
    // Create refs to track clicks outside the filter options
    const filterRefs = useRef([]);

    useEffect(() => {
        // Event listener to detect clicks outside filter
        const handleClickOutside = (event) => {
            if (filterRefs.current.every((ref) => ref && !ref.contains(event.target))) {
                setOpenFilter(null); // Close all filters if clicked outside
            }
        };

        // Add event listener to document
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handkeBtnClick = (btnType) => {
        setActiveBtn(btnType);
    }

    const handleFilterClick = (ind) => {
        setOpenFilter(openFilter === ind ? null : ind);
    }

    const handleOptionsSelect = (filterIndex, option) => {
        const updateOptions = [...selectedOptions];
        updateOptions[filterIndex] = option;
        setSelectedOptions(updateOptions);
        setOpenFilter(null);
    }

    return (
        <section className="section hero">
            <div className="container">
                <hgroup>
                    <h1>Find Your Perfect Home</h1>
                    <p><b>Making Your Home Search Easy and Enjoyable</b></p>
                </hgroup>

                <div className="btns">
                    <button className={`btn ${activeBtn === "buy" ? "active" : ""}`} onClick={() => handkeBtnClick("buy")}>Buy Properties</button>
                    <button className={`btn-light ${activeBtn === "rent" ? "active" : ""}`} onClick={() => handkeBtnClick("rent")}>Rent Properties</button>
                </div>

                <div className="hero-filters">
                    <div className="filters">

                        <div className="filter-item">
                            <div className="filter-content">
                                <label htmlFor="">Location</label>
                                <div className="filter-desc">
                                    <FaLocationDot />
                                    <span>Seacrh Location</span>
                                </div>
                            </div>
                        </div>

                        {filterOptions.slice(0, 2).map((filter, ind) => (
                            <div className="filter-item" key={ind}>
                                <div 
                                    className="filter-content" 
                                    onClick={() => handleFilterClick(ind)}
                                    ref={(el) => filterRefs.current[ind] = el} // Attach ref to each filter
                                >
                                    <label htmlFor="">{filter.title}</label>
                                    <div className="filter-desc">
                                        <FaChevronCircleDown />
                                        <span>{selectedOptions[ind]}</span>
                                    </div>

                                    {openFilter === ind && (
                                        <div className='filter-options'>
                                            {filter.options.map((opt) => (
                                                <label 
                                                    key={opt} 
                                                    className='filter-option' 
                                                    onClick={() => handleOptionsSelect(ind, opt)}
                                                >
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="filter-cta">
                            <button className=""> Search </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
