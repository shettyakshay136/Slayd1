// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import {
//   BackHandler,
//   Pressable,
//   StatusBar,
//   StyleSheet,
//   View,
// } from 'react-native';
// import {
//   BottomSheetModal,
//   BottomSheetView,
//   SCREEN_HEIGHT,
// } from '@gorhom/bottom-sheet';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const BottomSheetModalView = ({ bottomSheetModalRef, children, containerStyle = {} }) => {
//   const { top, bottom } = useSafeAreaInsets();
//   const statusBarHeight = StatusBar.currentHeight || 0;

//   const screenHeightSnapPoints = useMemo(
//     () => [
//       SCREEN_HEIGHT / 2,
//       SCREEN_HEIGHT - top - statusBarHeight,
//     ],
//     [top, statusBarHeight],
//   );

//   const [isBottomSheetModalOpen, setIsBottomSheetModalOpen] = useState(false);

//   const closeModal = useCallback(() => {
//     bottomSheetModalRef.current?.close();
//   }, [bottomSheetModalRef]);

//   const renderBackdrop = useCallback(
//     () => (
//       <Pressable onPress={closeModal} style={StyleSheet.absoluteFill} />
//     ),
//     [closeModal],
//   );

//   const handleComponent = () => (
//     <View style={styles.handleContainer}>
//       <View style={styles.handle} />
//     </View>
//   );

//   const backAction = useCallback(() => {
//     if (isBottomSheetModalOpen) {
//       closeModal();
//       return true;
//     }
//     return false;
//   }, [isBottomSheetModalOpen, closeModal]);

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//     return () => backHandler.remove();
//   }, [backAction]);

//   return (
//     <BottomSheetModal
//       ref={bottomSheetModalRef}
//       index={0}
//       backgroundStyle={styles.background}
//       snapPoints={screenHeightSnapPoints}
//       handleComponent={handleComponent}
//       backdropComponent={renderBackdrop}
//       onChange={(index) => setIsBottomSheetModalOpen(index >= 0)}
//     >
//       <BottomSheetView style={[styles.container, { paddingBottom: bottom }, containerStyle]}>
//         {children}
//       </BottomSheetView>
//     </BottomSheetModal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     borderRadius: 28,
//   },
//   handle: {
//     height: 4,
//     width: 32,
//     borderRadius: 100,
//     alignSelf: 'center',
//     marginVertical: 16,
//     backgroundColor: '#ccc',
//   },
//   handleContainer: {
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//   },
// });

// export default BottomSheetModalView;
