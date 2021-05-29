import {useEffect, useState} from 'react';
import * as Location from 'expo-location';

export type LocationResponse = Location.LocationObject;

export type Callback = (position: LocationResponse) => void;

interface Props {
  onChange: Callback;
}
export const useGeoLocation = (props: Props) => {
  const {onChange} = props;
  const [location, setLocation] = useState<LocationResponse>();

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      onChange && onChange(location);

      const sub = await Location.watchPositionAsync({}, loc => {
        console.log(loc);
      });

      return sub?.remove();
    })();
  }, []);

  return location;
};
