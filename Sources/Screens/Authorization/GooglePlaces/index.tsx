import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import isEqual from 'react-fast-compare';
import {GooglePlacesAutocomplete, GooglePlaceDetail, GooglePlaceData} from 'react-native-google-places-autocomplete';
import {APP_SCREEN, RootStackParamList} from '@Navigation/ScreenTypes';
import {StackScreenProps} from '@react-navigation/stack';
import config from '@Config';
import Block from '@Components/Block';
import Text from '@Components/Text';
import Header from '@Components/Header';
import {useTheme} from '@react-navigation/native';
import {getLanguage} from '@Utils/DeviceInfo';
import {scale, verticalScale} from '@Common/Scale';
import KeyboardSpacer from '@Components/KeyboardSpacer';
import {ICoordinate} from '@Types';

const styles = StyleSheet.create({
  icon: {
    marginRight: scale(4),
    width: scale(20),
    height: scale(20),
  },
  name: {},
  description: {
    flex: 1,
    marginRight: 20,
  },
});
type Props = StackScreenProps<RootStackParamList, APP_SCREEN.GOOGLE_PLACES>;

const {width: windowWidth} = Dimensions.get('window');
const GooglePlaces = ({navigation, route}: Props) => {
  const theme = useTheme();
  const ref = useRef<any>(null);

  useEffect(() => {
    const timeoutID = setTimeout(() => ref?.current?.focus(), 500);

    return () => {
      timeoutID && clearTimeout(timeoutID);
    };
  }, []);

  const onBack = () => navigation.navigate(route.params.fromScreen, {coordinate: undefined});

  const onPress = useCallback((data: GooglePlaceData, detail: GooglePlaceDetail | null) => {
    const form: ICoordinate = {
      id: '',
      formatted_address: detail?.formatted_address || data.description,
      google_place_id: detail?.place_id || data?.place_id,
      lat: detail?.geometry?.location?.lat,
      lng: detail?.geometry?.location?.lng,
      types: detail?.types || '',
    };

    if (Array.isArray(detail?.address_components)) {
      detail?.address_components?.forEach(item => {
        if (Array.isArray(item.types)) {
          if (item.types.includes('street_number')) {
            form.number = item.long_name;
          } else if (item.types.includes('administrative_area_level_2')) {
            form.district = item.long_name;
          } else if (item.types.includes('administrative_area_level_1')) {
            form.city = item.long_name;
          } else if (item.types.includes('country')) {
            form.country = item.long_name;
            form.country_code = item.short_name;
          } else if (item.types.includes('route')) {
            form.street = item.long_name;
          }
        }
      });
    }

    navigation.navigate(route.params.fromScreen, {coordinate: form});
  }, []);

  const renderRow = (data: any) => {
    if (data.description) {
      return (
        <Block width={windowWidth}>
          <Text numberOfLines={2} style={styles.description} text={data?.description} />
        </Block>
      );
    }
    return null;
  };

  return (
    <Block block>
      <Header paddingBottom={verticalScale(10)} onLeftPress={onBack} />
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Search address"
        minLength={2} // minimum length of text to search
        // returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={onPress}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: config.googleMapKey,
          language: getLanguage(), // language of the results
          components: `country:vi`,
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: theme.colors.primary,
          },
        }}
        // @ts-ignore
        renderRow={renderRow}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          //   types: 'laundry',
        }}
        filterReverseGeocodingByTypes={[
          'street_number',
          'street_address',
          'locality',
          'sublocality',
          'administrative_area_level_1',
          'administrative_area_level_2',
          'administrative_area_level_3',
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200}
        listEmptyComponent={() => {
          return (
            <Text tx="If you can't find your exact address on Google, please pick an address that's the closest to you"></Text>
          );
        }}
      />
      <KeyboardSpacer />
    </Block>
  );
};

export default memo(GooglePlaces, isEqual);
