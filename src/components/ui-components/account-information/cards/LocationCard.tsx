import { AccountInformationLocationObject } from "@/ts-types/account-information";
import React from "react";

interface LocationCardProps {
  location_information: AccountInformationLocationObject;
}

const LocationCard: React.FC<LocationCardProps> = ({
  location_information,
}) => {
  const address = `${location_information?.street_address}, ${location_information?.city}, ${location_information?.state}, ${location_information?.postal_code}, ${location_information?.country}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <div className="relative h-64   bg-white w-full rounded-lg shadow-lg overflow-hidden    mx-auto">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/closeup-smartphone-with-gps-application_1098-21636.jpg?t=st=1717102063~exp=1717105663~hmac=ba245afbe84ad116406003721a68bbb2c53d3fe02e8990c3c3941564ad6b73c9&w=900')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative p-6 text-white bg-black bg-opacity-60">
        <h2 className="text-xl font-bold mb-2">Location Details</h2>
        <p className="mb-1">
          <strong>Street Address:</strong>
          <span className="text-blue-500">
            {" "}
            {location_information?.street_address}
          </span>
        </p>
        <p className="mb-1">
          <strong>City:</strong>{" "}
          <span className="text-blue-500">{location_information?.city}</span>
        </p>
        <p className="mb-1">
          <strong>State:</strong>{" "}
          <span className="text-blue-500">{location_information?.state}</span>
        </p>
        <p className="mb-1">
          <strong>Postal Code:</strong>
          <span className="text-blue-500">
            {" "}
            {location_information?.postal_code}
          </span>
        </p>
        <p className="mb-1">
          <strong>Country:</strong>{" "}
          <span className="text-blue-500">{location_information?.country}</span>
        </p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className=" mt-1 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Search on Google
        </a>
      </div>
    </div>
  );
};

export default LocationCard;
