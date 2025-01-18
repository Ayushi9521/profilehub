import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude
};

function MapComponent() {
  const selectedProfile = useSelector(
    (state) => state.profiles.selectedProfile
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCurh8PbokTEID1dHAzn9g5THvRpLU1waQ",
  });

  const [coordinates, setCoordinates] = useState(defaultCenter);

  const getCoordinates = async (address) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded yet.");
      return null;
    }

    const geocoder = new window.google.maps.Geocoder();
    try {
      const results = await geocoder.geocode({ address });
      console.log("Geocoder Results:", results);

      if (results && results.results && results.results.length > 0) {
        return results.results[0].geometry.location;
      }
      console.warn("No results found for address:", address);
      return null;
    } catch (error) {
      console.error("Error during geocoding:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!selectedProfile || !selectedProfile.address || !isLoaded) {
        console.warn("Profile or address not available.");
        return;
      }

      const { city, state, country = "USA" } = selectedProfile.address;

      if (!city || !state) {
        console.warn(
          "Incomplete address data. Ensure city and state are present.",
          selectedProfile.address
        );
        return;
      }

      const fullAddress = `${city}, ${state}, ${country}`;
      console.log("Geocoding Address:", fullAddress);

      const location = await getCoordinates(fullAddress);

      if (location) {
        setCoordinates({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        console.warn("Could not find location for address:", fullAddress);
        setCoordinates(defaultCenter); // Fallback to default center
      }
    };

    fetchCoordinates();
  }, [selectedProfile, isLoaded]);

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!selectedProfile) {
    return <p>No profile selected. Please select a profile to view the map.</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={14}
    >
      <Marker position={coordinates} />
    </GoogleMap>
  );
}

export default MapComponent;
