import { useState } from "react";
import { filterOptions } from "../../data";
import iconClose from '../../assets/img/closeIcon.png';
import { IoIosArrowDown } from "react-icons/io";

const Filters = ({ setChoosenVal }) => {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    const handleCheckboxChange = (category, val, isChecked) => {
        setShowFilters(!showFilters)
        setChoosenVal((prevState) => {
            const updatedChoosenVal = { ...prevState };
            const newVal = isNaN(val[0]) ? val : parseInt(val, 10);

            if (isChecked) {
                if (updatedChoosenVal[category]) {
                    if (!updatedChoosenVal[category].includes(newVal)) {
                        updatedChoosenVal[category].push(newVal);
                    }
                } else {
                    updatedChoosenVal[category] = [newVal];
                }
            } else {
                if (updatedChoosenVal[category]) {
                    updatedChoosenVal[category] = updatedChoosenVal[category].filter(
                        (item) => item !== newVal
                    );
                }
            }

            return updatedChoosenVal;
        });
    };


    return (
        <aside className="sidebar">
            <div className="filter-title" onClick={toggleFilters}>
                <IoIosArrowDown />
                <h2 className="h3">Filter By</h2>
            </div>

            <div className={`filter-container ${showFilters ? "open" : ""}`}>
                <button className="navbar-toggle" onClick={toggleFilters}>
                    <img src={iconClose} alt="Menu" />
                </button>

                {filterOptions.map((filter) => (
                    <section key={filter.id} className="filter-section">
                        <div className="filter-section-title">
                            <b>{filter.title}:</b>
                        </div>
                        <div className="filter-section-wrapper">
                            {filter.options.map((option) => (
                                <label key={option}>
                                    <input
                                        type="checkbox"
                                        name={filter.name}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                filter.name,
                                                option,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </aside>
    )
}

export default Filters