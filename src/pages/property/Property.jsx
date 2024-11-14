import { useParams } from "react-router-dom";
import "./Property.sass";
import { amenities, properties, propertyImages } from "../../data";
import Navbar from "../../components/navbar/Navbar";
import { PiBathtub } from "react-icons/pi";
import { LuBedDouble } from "react-icons/lu";
import { BiArea } from "react-icons/bi";

export const Property = () => {
    const { id } = useParams();
    const property = properties.find((property) => property.id === parseInt(id));

    if (!property) {
        return <div>Property not found</div>;
    }

    return (
        <div>
            <Navbar bg="black" />

            <main className="property container">
                <div className="property-wrappeer">
                    <h1 className="property-heading">
                        {property.type} for {property.title} in {property.address}
                    </h1>
                    <section className="property-image">
                        <div className="property-image-demo">
                            <img src={propertyImages[0].image} alt="" />
                        </div>
                        <div className="property-image-thumb">
                            {propertyImages.slice(1).map((image, index) => (
                                <img src={image.image} alt="" key={index} />
                            ))}
                        </div>
                    </section>
                    <section className="property-details">
                        <h2 class="h3">{property.price}</h2>
                        <div className="property-rooms">
                            <div>
                                <LuBedDouble className="icon" />
                                <span>{property.badrooms} Bedrooms</span>
                            </div>
                            <div>
                                <PiBathtub className="icon" />
                                <span>{property.bathrooms} Bathrooms</span>
                            </div>
                            <div>
                                <BiArea className="icon" />
                                <span>{property.size} (sqm)</span>
                            </div>
                        </div>
                    </section>
                    <section className="property-amenities">
                        <h2 class="h3">Amenities</h2>
                        <div className="amenities">
                            {amenities.map((item) => (
                                <div key={item.id} className="amenity">
                                    <div className="icon">{item.icon}</div>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};
