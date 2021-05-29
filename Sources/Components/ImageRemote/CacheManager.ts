import _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

export interface DownloadOptions {
  md5?: boolean;
  headers?: {[name: string]: string};
}

const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`;

export class CacheEntry {
  uri: string;

  options: DownloadOptions;

  constructor(uri: string, options: DownloadOptions) {
    this.uri = uri;
    this.options = options;
  }

  async getPath(): Promise<string | undefined> {
    const {uri, options} = this;
    const {path, exists} = await getCacheEntry(uri);

    if (exists) {
      return path;
    }

    const result = await FileSystem.createDownloadResumable(uri, path, options).downloadAsync();
    // If the image download failed, we don't cache anything
    if (result && result.status !== 200) {
      return uri;
    }

    return path;
  }
}

export default class CacheManager {
  static entries: {[uri: string]: CacheEntry} = {};

  static get(uri: string, options: DownloadOptions): CacheEntry {
    if (!CacheManager.entries[uri]) {
      CacheManager.entries[uri] = new CacheEntry(uri, options);
    }
    return CacheManager.entries[uri];
  }

  static async clearCache(): Promise<void> {
    await FileSystem.deleteAsync(BASE_DIR, {idempotent: true});
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  }

  static async getCacheSize(): Promise<number> {
    const result = await FileSystem.getInfoAsync(BASE_DIR);
    if (!result.exists) {
      throw new Error(`${BASE_DIR} not found`);
    }
    return result.size;
  }
}

const getCacheEntry = async (uri: string): Promise<{exists: boolean; path: string}> => {
  const filename = uri.substring(uri.lastIndexOf('/'), uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?'));
  const ext = filename.indexOf('.') === -1 ? '.jpg' : filename.substring(filename.lastIndexOf('.'));

  const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, uri);
  const path = `${BASE_DIR}${digest}`;

  const info = await FileSystem.getInfoAsync(path);
  if (!info.exists) {
    try {
      await FileSystem.makeDirectoryAsync(BASE_DIR, {intermediates: true});
    } catch (e) {
      console.log('*** makeDirectoryAsync error: ', e);
    }
  }

  const {exists} = info;
  return {exists, path};
};
