import React from 'react';
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import styled from 'styled-components';

const MapContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const mapState = { center: [44.23276, 41.56953], zoom: 9, controls: [] };
 
const MyPlacemark = ({ files }) => {

  let placemarks = [];

  Object.keys(files).forEach((name, index) => {
    const newPlacemarks = files[name].isActive 
    ? files[name].coords.map(coordsCouple => {
        console.log(coordsCouple);
        return (
          <Placemark 
            geometry={{
              coordinates: coordsCouple
            }}
            options={{
              preset: 'islands#icon',
              iconColor: files[name].color
            }}
          />
        )
      }
    )
    :
    [];

    placemarks = placemarks.concat(newPlacemarks);
  })

  return (
    <MapContainer>
      <YMaps>
        <Map 
          state={mapState}
          width='100%'  
          height='100%'
        >

        {placemarks}

        </Map>
      </YMaps>
    </MapContainer>
  );
};

export default MyPlacemark;

