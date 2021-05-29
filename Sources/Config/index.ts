import Constants from 'expo-constants';

const apiUrl =
  typeof Constants.manifest.packagerOpts === `object` && Constants.manifest.packagerOpts.dev
    ? Constants.manifest.debuggerHost
      ? `http://${Constants.manifest.debuggerHost.split(`:`)?.shift()?.concat(`:18000`)}`
      : 'http://api.goda.localhost'
    : `http://api.goda.localhost`;

const chatApiUrl =
  typeof Constants.manifest.packagerOpts === `object` && Constants.manifest.packagerOpts.dev
    ? Constants.manifest.debuggerHost
      ? `http://${Constants.manifest.debuggerHost.split(`:`)?.shift()?.concat(`:18001`)}`
      : 'http://chat.goda.localhost'
    : `http://chat.goda.localhost`;

const chatWS =
  typeof Constants.manifest.packagerOpts === `object` && Constants.manifest.packagerOpts.dev
    ? Constants.manifest.debuggerHost
      ? `ws://${Constants.manifest.debuggerHost.split(`:`)?.shift()?.concat(`:18001`)}/ws`
      : 'ws://chat.goda.localhost/ws'
    : `ws://chat.goda.localhost/ws`;

const ENV = {
  local: {
    apiUrl: apiUrl,
    chatApiUrl: chatApiUrl,
    wsUrl: chatWS,
    googleMapKey: 'AIzaSyCHy12YAUgj8tq_wJcDKmnIBwkwbLoC9kg',
    sentryDSN: 'https://3cdd2bec3a974f1eb9f1206c528a313c@o456765.ingest.sentry.io/5567002',
  },
  staging: {
    apiUrl: 'https://api-staging.goda.com',
    chatApiUrl: 'https://chat-staging.goda.com',
    wsUrl: 'wss://chat-staging.goda.com/ws',
    googleMapKey: 'AIzaSyCHy12YAUgj8tq_wJcDKmnIBwkwbLoC9kg',
    sentryDSN: 'https://3cdd2bec3a974f1eb9f1206c528a313c@o456765.ingest.sentry.io/5567002',
  },
  prod: {
    apiUrl: 'https://api.goda.com',
    chatApiUrl: 'https://chat.goda.com',
    wsUrl: 'wss://chat.goda.com/ws',
    googleMapKey: 'AIzaSyCHy12YAUgj8tq_wJcDKmnIBwkwbLoC9kg',
    sentryDSN: 'https://3cdd2bec3a974f1eb9f1206c528a313c@o456765.ingest.sentry.io/5567002',
  },
};

export type AppMode = keyof typeof ENV;

function getEnvVars(env: AppMode = 'staging') {
  if (env === null || env === undefined) return ENV.staging;
  if (env.indexOf('local') !== -1) return ENV.local;
  if (env.indexOf('staging') !== -1) return ENV.staging;
  if (env.indexOf('prod') !== -1) return ENV.prod;
}

const config = {
  ...getEnvVars(Constants.manifest.releaseChannel as AppMode)!,
  isAppStandalone: Constants.appOwnership !== 'standalone',
  manifest: Constants.manifest,
};

export default config;
