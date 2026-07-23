import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, ImageBackground, Image, Platform } from 'react-native';

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
        useNativeDriver: Platform.OS !== 'web',
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
    <Pressable onPress={onPress} style={styles.cell}>
      <View style={styles.cellInner}>
        <Animated.View style={[styles.face, frontStyle, styles.shadows, isActive && styles.activeShadows]}>
          <ImageBackground source={frontImage} style={styles.bgImage} imageStyle={styles.bgImageStyle}>
          </ImageBackground>
        </Animated.View>

        <Animated.View style={[styles.face, backStyle, styles.backFace]}>
          <Image source={backImage} resizeMode="cover" style={styles.icon} />
        </Animated.View>
      </View>
    </Pressable>
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
    borderRadius: 50,
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
    boxShadow: '0px 3px 8px rgba(0,0,0,0.5)',
    elevation: 4,
  },
  activeShadows: {
    boxShadow: '0px 0px 12px #00ff55',
    borderWidth: 2,
    borderColor: '#00ff55',
    elevation: 8,
  },
  backFace: {
    backgroundColor: '#3e1f10',
    boxShadow: 'inset 0px 0px 10px #000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '85%',
    height: '85%',
    borderRadius: 50,
  }
});
