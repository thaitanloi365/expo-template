const gifs = {
  welcome1: require('./Sources/welcome_1.gif'),
  welcome2: require('./Sources/welcome_2.gif'),
};

export type GifTypes = keyof typeof gifs;

export default gifs;
