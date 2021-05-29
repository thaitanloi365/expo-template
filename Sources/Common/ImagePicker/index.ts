import {useState} from 'react';
import {Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export type ImagePickerResult = ImagePicker.ImagePickerResult;
type onSuccessCallback = (result: ImagePickerResult) => void;
type onErrorCallback = (err: Error) => void;
type ImagePickerType = 'camera' | 'library';

interface Props {
  onSuccess: onSuccessCallback;
  onError?: onErrorCallback;
}

export const useImagePicker = (props: Props): [(type: ImagePickerType) => void, string] => {
  const [imageURI, setImageURI] = useState('');
  const {onSuccess, onError} = props;

  const show = (type: ImagePickerType) => {
    if (type === 'camera') {
      lunchCamera();
    } else {
      lunchImage();
    }
  };

  const lunchCamera = async () => {
    try {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          throw Error('Sorry, we need camera permissions to make this work!');
        }

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: false,
        });

        if (!result.cancelled) {
          setImageURI(result.uri);
          onSuccess && onSuccess(result);
        }
      }
    } catch (error) {
      onError && onError(error);
    }
  };
  const lunchImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          throw Error('Sorry, we need camera roll permissions to make this work!');
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: false,
        });

        if (!result.cancelled) {
          setImageURI(result.uri);
          onSuccess && onSuccess(result);
        }
      }
    } catch (error) {
      onError && onError(error);
    }
  };

  // return [show, hide];

  return [show, imageURI];
};
