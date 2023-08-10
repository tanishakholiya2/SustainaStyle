import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    limelight: require('../assets/fonts/Lovelace.otf'),
    indie: require('../assets/fonts/LovelaceItalic.otf'),
  });