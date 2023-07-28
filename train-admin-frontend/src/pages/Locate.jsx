import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 43.942253,
  lng: -79.375316,
};

const styles = {
  hide: [
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};

const Locate = () => {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    componentRestrictions: { country: "ca" },
    libraries,
  });

  const [map, setMap] = useState(null);

  // eslint-disable-next-line no-shadow
  const onLoad = React.useCallback(function callback(map) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const trainData = [
    {
      id: 1,
      name: "Ruhunu Kumari",
      latitude: 6.0333,
      longitude: 80.2144,
      // description: "",
    },

    // Add more train data as needed
  ];

  const [activeTrain, setActiveTrain] = useState(null);

  return isLoaded ? (
    <div className="settings h-full">
      <div className="settings__wrapper h-full">
        <h2 className="settings__title">Train Tracking</h2>
        <div>
          {/* <div className="w-full mb-2 flex justify-end space-x-2">tsst</div> */}
          <div className="h-[75vh] w-full overflow-hidden relative">
            <GoogleMap
              mapContainerStyle={containerStyle}
              defaultCenter={center}
              onLoad={onLoad}
              options={{
                styles: styles.hide,
                fullscreenControl: false,
                clickableIcons: false,
                mapTypeControl: false,
                streetViewControl: false,
                maxZoom: 17,
              }}
            >
              {trainData.map((train) => (
                <Marker
                  key={train.id}
                  position={{ lat: train.latitude, lng: train.longitude }}
                  onClick={() => setActiveTrain(train)}
                />
              ))}

              {/* Render the InfoWindow conditionally based on the activeTrain */}
              {activeTrain && (
                <InfoWindow
                  position={{
                    lat: activeTrain.latitude,
                    lng: activeTrain.longitude,
                  }}
                  onCloseClick={() => setActiveTrain(null)}
                >
                  {/* Content for InfoWindow */}
                  <div className="p-3">
                    <h3>{activeTrain.name}</h3>
                    <p>{activeTrain.description}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Locate;
