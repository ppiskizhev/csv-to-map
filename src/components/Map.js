import React from 'react';
import { YMaps, Map, ObjectManager } from 'react-yandex-maps';
import styled from 'styled-components';
import { createPlacemark, copyFields } from '../helpers';

const MapContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const mapState = {
  center: [45.03547, 38.975313],
  zoom: 8,
  controls: [],
};

const MyMap = ({ files }) => {
  let features = [];

  Object.keys(files).forEach(name => {
    const currentFile = files[name];

    if (currentFile.isActive) {
      currentFile.geoData
        .reduce((filtered, item) => {
          for (let i = 0; i < filtered.length; i++) {
            if (filtered[i].partner === item.partner) {
              filtered[i] = copyFields({ ...filtered[i] }, { ...item });
              return filtered;
            }
          }

          filtered.push({ ...item });
          return filtered;
        }, [])
        .forEach(data => {
          features.push(createPlacemark(data, currentFile.color));
        });
    }
  });

  const indexedFeatures = features.map((item, index) => {
    item.id = index;
    return item;
  });

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
            features={indexedFeatures}
          />
        </Map>
      </YMaps>
    </MapContainer>
  );
};

export default MyMap;
