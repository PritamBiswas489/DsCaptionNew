import {View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import appColors from '@theme/appColors';
import {propsType} from './types';

export function MapContainer({latitude, longitude}: propsType) {
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="Marker Title"
          description="Marker Description"
          pinColor={appColors.primary}
        />
      </MapView>
    </View>
  );
}
