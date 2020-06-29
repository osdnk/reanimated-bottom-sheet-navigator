import * as React from 'react';
import { View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { NavigationHelpersContext } from '@react-navigation/native';
import { BottomSheetActions } from './BottomSheetRouter';
import type {
  BottomSheetNavigationState,
  BottomSheetDescriptorMap,
  BottomSheetNavigationConfig,
  BottomSheetNavigationHelpers,
} from './types';

type Props = BottomSheetNavigationConfig & {
  state: BottomSheetNavigationState;
  navigation: BottomSheetNavigationHelpers;
  descriptors: BottomSheetDescriptorMap;
};

export default function BottomSheetView({
  state,
  navigation,
  descriptors,
  defaultSnap,
  snapPoints,
  ...rest
}: Props) {
  const [loaded, setLoaded] = React.useState([state.index]);

  if (!loaded.includes(state.index)) {
    setLoaded((l) => [...l, state.index]);
  }

  const sheetRef = React.useRef<BottomSheet>(null);
  const currentSnapPoint = (state.history.find(
    (it) => it.type === 'bottom-sheet'
  ) as { type: 'bottom-sheet'; point: number } | undefined)?.point;

  React.useEffect(() => {
    sheetRef.current?.snapTo(
      currentSnapPoint !== undefined ? currentSnapPoint : snapPoints.length - 1
    );
  }, [currentSnapPoint, snapPoints.length]);

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      {state.routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        const isFocused = state.index === index;

        if (!loaded.includes(index) && !isFocused) {
          // Don't render a screen if we've never navigated to it
          return null;
        }

        return (
          <View
            key={route.key}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ display: isFocused ? 'flex' : 'none', flex: 1 }}
          >
            {descriptor.render()}
          </View>
        );
      })}
      <BottomSheet
        {...rest}
        ref={sheetRef}
        initialSnap={defaultSnap ?? snapPoints.length - 1}
        snapPoints={snapPoints}
        onOpenStart={() => navigation.emit({ type: 'sheetOpenStart' })}
        onCloseStart={() => navigation.emit({ type: 'sheetCloseStart' })}
        onOpenEnd={() => {
          navigation.dispatch(BottomSheetActions.openSheet());
          navigation.emit({ type: 'sheetOpenEnd' });
        }}
        onCloseEnd={() => {
          navigation.dispatch(BottomSheetActions.closeSheet());
          navigation.emit({ type: 'sheetCloseEnd' });
        }}
      />
    </NavigationHelpersContext.Provider>
  );
}
