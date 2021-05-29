const images = {
  default: require('./Sources/default.png'),
  splash: require('./Sources/splash.png'),
  logo: require('./Sources/logo.png'),
  defaultDressOption: require('./Sources/defaultDressOption.png'),

  emptyHome: require('./Sources/emptyHome.png'),
  emptyChat: require('./Sources/emptyChat.png'),
  emptyMatchesAvailable: require('./Sources/emptyMatchesAvailable.png'),
  onboardingLike: require('./Sources/onboardingLike.png'),
  onboardingMatch: require('./Sources/onboardingMatch.png'),
  onboardingSwap: require('./Sources/onboardingSwap.png'),
  meetInPerson: require('./Sources/meetInPerson.png'),
  pickAndDrop: require('./Sources/pickAndDrop.png'),
  homeDelivery: require('./Sources/homeDelivery.png'),
  scheduleHomeDelivery: require('./Sources/scheduleHomeDelivery.png'),
  scheduleMeetInPerson: require('./Sources/scheduleMeetInPerson.png'),
  schedulePickAndDrop: require('./Sources/schedulePickAndDrop.png'),
};

export type ImageTypes = keyof typeof images;

export default images;
