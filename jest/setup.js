import 'react-native-gesture-handler/jestSetup';
import '@react-native-community/netinfo';
import '@react-native-community/async-storage';
jest.mock('react-native-orientation-locker', () => {
	return {
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		lockToPortrait: jest.fn(),
		lockToLandscapeLeft: jest.fn(),
		lockToLandscapeRight: jest.fn(),
		unlockAllOrientations: jest.fn(),
	};
});
jest.mock('@react-native-community/async-storage', () => {
	return {
	  getVersion: jest.fn(() => Promise.resolve('1.0')),
	  getApplicationName: jest.fn(() => Promise.resolve('addtek-minesweeper')),
	};
  });
jest.mock('@react-native-community/netinfo', () => {
	return {
	  getVersion: jest.fn(() => Promise.resolve('1.0')),
	  getApplicationName: jest.fn(() => Promise.resolve('addtek-minesweeper')),
	};
  });
  
  jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock');
  
	// The mock for `call` immediately calls the callback which is incorrect
	// So we override it with a no-op
	Reanimated.default.call = () => {};
  
	return Reanimated;
  });
  jest.mock('@react-native-firebase/app/lib/common', () => ({
	isAndroid: jest.fn(() => true),
	isBoolean: jest.fn(() => false),
 }));
 jest.mock('@react-native-firebase/auth', () => ({
	isAndroid: jest.fn(() => true),
	isBoolean: jest.fn(() => false),
 }));
 jest.mock('@react-native-firebase/firestore', () => ({
	isAndroid: jest.fn(() => true),
	isBoolean: jest.fn(() => false),
 }));
  // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
  jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
