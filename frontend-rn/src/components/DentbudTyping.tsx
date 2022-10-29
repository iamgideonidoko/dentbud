import React, { useEffect } from 'react';
import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withTiming,
  // interpolate,
} from 'react-native-reanimated';
import DentbudLogo from '../assets/images/dentbud-logo-sm.png';

const DentbudTyping: FC<{ delay: number }> = ({ delay }) => {
  const offset = useSharedValue(0);

  const offsetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });
  useEffect(() => {
    offset.value = withDelay(delay, withRepeat(withTiming(50, { duration: 500 }), -1, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Animated.View style={[styles.animatedView, offsetStyle]}>
      <Image source={DentbudLogo} style={{ width: 30, height: 30, borderRadius: 100, marginRight: 6 }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
});

export default DentbudTyping;
