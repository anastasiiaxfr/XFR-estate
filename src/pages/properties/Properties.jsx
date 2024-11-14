import "./Properties.sass";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";

import { filterOptions, properties } from "../../data";
import { FaLocationDot } from "react-icons/fa6";
import { LuBedDouble } from "react-icons/lu";
import { PiBathtub } from "react-icons/pi";
import { BiArea } from "react-icons/bi";

export const Properties = () => {
    return (
        <div>
            <div className="bg">
                <Navbar />
                <Hero />
            </div>
            <div className="container page">
                <aside className="sidebar">
                    <h2 className="h3">Filter By</h2>
                    {filterOptions.map((filter) => (
                        <section key={filter.id} className="filter-section">
                            <div className="filter-section-title">
                                <b>{filter.title}:</b>
                            </div>
                            <div className="filter-section-wrapper">
                                {filter.options.map((option) => (
                                    <label key={option}>
                                        <input type="checkbox" />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    ))}
                </aside>
                <main className="">
                    <div className="cards">
                        {properties.map((property) => (
                            <article key={property.id} className="card">
                                <div className="card-img">
                                <div className="card-title">
                                        {property.title}
                                    </div>
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                    />
                                </div>

                                <div className="card-content">
                                    <div className="card-header">
                                   
                                    <div className="card-type">{property.type}</div>
                                    </div> 
                                    <div className="card-price">{property.price}</div>
                                    <div className="card-address">
                                        <FaLocationDot className="card-icon" />
                                        {property.address}
                                    </div>
                                    <div className="card-rooms">
                                        <div>
                                            <LuBedDouble className="card-icon" />
                                            {property.bedrooms}
                                        </div>
                                        <div>
                                            <PiBathtub className="card-icon" />
                                            {property.bathrooms}
                                        </div>
                                        <div>
                                            <BiArea className="card-icon" />
                                            {property.size} (sqm)
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};
