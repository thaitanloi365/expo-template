import {useCallback, useEffect, useState} from 'react';
import {loadLocalizationAsync} from '@Utils/DeviceInfo';
import {fonts} from '@Assets/Fonts';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import images from '@Assets/Images';
import icons from '@Assets/Icons';
import gifs from '@Assets/Gifs';

export const useLoadResources = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = useCallback(async () => {
    try {
      await prepareResources();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  async function cacheResourcesAsync() {
    const cacheImages = Object.values(images).map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    const cacheIcons = Object.values(icons).map(icon => {
      return Asset.fromModule(icon).downloadAsync();
    });

    const cacheGifs = Object.values(gifs).map(icon => {
      return Asset.fromModule(icon).downloadAsync();
    });

    return Promise.all(cacheImages.concat(cacheIcons).concat(cacheGifs));
  }

  async function loadFonts() {
    return Font.loadAsync(fonts);
  }

  const prepareResources = async () => {
    try {
      await Promise.all([loadFonts(), loadLocalizationAsync(), cacheResourcesAsync()]);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoaded(true);
    }
  };

  return [loaded];
};
