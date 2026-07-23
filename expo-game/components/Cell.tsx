import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, ImageBackground, Image } from 'react-native';

interface CellProps {
  isRevealed: boolean;
  isActive: boolean;
  isCore: boolean;
  onPress: () => void;
}

export function Cell({ isRevealed, isActive, isCore, onPress }: CellProps) {
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRevealed) {
      Animated.timing(flipAnim, {
        toValue: 180,
        duration: 550,
        useNativeDriver: true,
      }).start();
    } else {
      flipAnim.setValue(0);
    }
  }, [isRevealed]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg']
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  });

  const frontStyle = { transform: [{ rotateY: frontInterpolate }, { perspective: 600 }] };
  const backStyle = { transform: [{ rotateY: backInterpolate }, { perspective: 600 }], position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const;

  const frontImage = isActive ? require('../assets/ftr.jpg') : require('../assets/board.jpg');
  const backImage = isCore ? require('../assets/cuteapple.jpg') : require('../assets/fullapple.jpg');

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cell}>
        <View style={styles.cellInner}>
          <Animated.View style={[styles.face, frontStyle, styles.shadows, isActive && styles.activeShadows]}>
            <ImageBackground source={frontImage} style={styles.bgImage} imageStyle={styles.bgImageStyle}>
            </ImageBackground>
          </Animated.View>

          <Animated.View style={[styles.face, backStyle, styles.backFace]}>
            <Image source={backImage} style={styles.icon} />
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cellInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  face: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    borderRadius: 50, // To make them circles
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImageStyle: {
    borderRadius: 50,
  },
  shadows: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  activeShadows: {
    shadowColor: '#00ff55',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: '#00ff55',
    elevation: 8,
  },
  backFace: {
    backgroundColor: '#3e1f10', // Simplified radial gradient fallback
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '85%',
    height: '85%',
    resizeMode: 'cover',
    borderRadius: 50,
  }
});
