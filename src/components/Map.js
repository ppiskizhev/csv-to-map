import React from 'react';
import { YMaps, Map, ObjectManager } from 'react-yandex-maps';
import styled from 'styled-components';

const MapContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const mapState = { center: [44.23276, 41.56953], zoom: 9, controls: [] };

const MyMap = ({ files }) => {
  let features = [];

  Object.keys(files).forEach(name => {
    const currentFile = files[name];
    if (currentFile.isActive) {
      currentFile.coords.forEach(coordsCouple => {
        features.push({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: coordsCouple },
          options: { preset: 'islands#icon', iconColor: currentFile.color },
        });
      });
    }
  });

  features.forEach((item, index) => (item.id = index));

  return (
    <MapContainer>
      <YMaps>
        <Map state={mapState} width="100%" height="100%">
          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 64,
            }}
            clusters={{
              clusterIconLayout: 'default#pieChart',
            }}
            features={features}
          />
        </Map>
      </YMaps>
    </MapContainer>
  );
};

export default MyMap;
