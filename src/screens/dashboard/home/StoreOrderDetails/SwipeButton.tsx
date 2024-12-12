import appColors from '@src/theme/appColors';
import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Text,
} from 'react-native';

const { width } = Dimensions.get('window');

const SwipeButton: React.FC<{ onSwipeComplete: () => void }> = ({
  onSwipeComplete,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newX = Math.max(0, Math.min(gestureState.dx, width - 100));
        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > width / 2) {
          // Successful swipe
          Animated.timing(translateX, {
            toValue: width - 100,
            duration: 200,
            useNativeDriver: true,
          }).start(() => onSwipeComplete());
        } else {
          // Reset position
          Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.swipeArea}>
        <Animated.Text
          style={[
            styles.swipeText,
            {
              opacity: translateX.interpolate({
                inputRange: [0, width - 100],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          Swipe to complete
        </Animated.Text>
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX }] }]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.thumbText}>⇄</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeArea: {
    width: width - 40,
    height: 50,
    backgroundColor: appColors.lightOrange,
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
   
  },
  swipeText: {
    position: 'absolute',
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
     color:'black'
  },
  thumb: {
    width: 100,
    height: 50,
    backgroundColor: appColors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});


export default SwipeButton;
