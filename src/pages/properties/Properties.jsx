import { useState, useEffect } from "react";
import "./Properties.sass";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";

import { properties } from "../../data";
import { FaLocationDot } from "react-icons/fa6";
import { LuBedDouble } from "react-icons/lu";
import { PiBathtub } from "react-icons/pi";
import { BiArea } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";


export const Properties = () => {
    const [filteredData, setFilteredData] = useState(properties);
    const [choosenVal, setChoosenVal] = useState({});

    const navigate = useNavigate();
    const handleNavigation = (id) => {
        navigate(`/properties/${id}`);
    };



    useEffect(() => {
        const filterProperties = () => {
            if (
                Object.keys(choosenVal).length === 0 ||
                Object.values(choosenVal).every((val) => val.length === 0)
            ) {
                return properties;
            }

            return properties.filter((prop) => {
                return Object.keys(choosenVal).every((key) => {
                    const selectedValues = choosenVal[key];

                    if (
                        selectedValues.some(
                            (value) =>
                                typeof value === "string" &&
                                (value.includes(">") || value.includes("<"))
                        )
                    ) {
                        return selectedValues.some((value) => {
                            const operator = value[0];
                            const number = parseInt(value.slice(1), 10);

                            if (operator === ">") {
                                return prop[key] >= number;
                            } else if (operator === "<") {
                                return prop[key] <= number;
                            }

                            return false;
                        });
                    }

                    if (Array.isArray(selectedValues) && selectedValues.length > 0) {
                        return selectedValues.some((value) => {
                            if (typeof value === "string") {
                                return value === prop[key];
                            } else if (typeof value === "number") {
                                return value === prop[key];
                            }
                            return false;
                        });
                    }

                    if (selectedValues.length === 0) {
                        return true;
                    }

                    return selectedValues === prop[key];
                });
            });
        };

        setFilteredData(filterProperties());
    }, [choosenVal]);

    console.log(choosenVal)

    return (
        <div>
            <div className="bg">
                <Navbar />
                <Hero />
            </div>
            <div className="container page">
              <Filters setChoosenVal={setChoosenVal}/>
                <main>
                    {filteredData.length > 0 ? (
                        <div className="cards">
                            {filteredData.map((property) => (
                                <article
                                    key={property.id}
                                    className="card"
                                    onClick={() => handleNavigation(property.id)}
                                >
                                    <div className="card-img">
                                        <div className="card-title">{property.title}</div>
                                        <img src={property.image} alt={property.title} />
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
                    ) : (
                        <h2 className="h3">Nothing found, try again!</h2>
                    )}
                </main>
            </div>
        </div>
    );
};
