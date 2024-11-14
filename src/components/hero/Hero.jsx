import { useState, useRef, useEffect } from 'react'
import './Hero.sass'
import { filterOptions } from '../../data'
import { FaChevronCircleDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Hero() {
    const [activeBtn, setActiveBtn] = useState("buy");
    const [openFilter, setOpenFilter] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState(
        filterOptions.map((filter) => filter.options[0])
    );
    
    const filterRefs = useRef([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRefs.current.every((ref) => ref && !ref.contains(event.target))) {
                setOpenFilter(null); 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

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

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/properties');
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

                        <div className="filter-cta" onClick={() => handleNavigate()}>
                            <button className=""> Search </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
