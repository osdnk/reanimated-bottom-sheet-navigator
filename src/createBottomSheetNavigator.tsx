import * as React from 'react';
import {
  createNavigatorFactory,
  useNavigationBuilder,
  DefaultNavigatorOptions,
} from '@react-navigation/native';
import BottomSheetView from './BottomSheetView';
import BottomSheetRouter from './BottomSheetRouter';
import type {
  BottomSheetNavigationState,
  BottomSheetRouterOptions,
  BottomSheetNavigationOptions,
  BottomSheetNavigationConfig,
  BottomSheetNavigationEventMap,
} from './types';

type Props = DefaultNavigatorOptions<BottomSheetNavigationOptions> &
  BottomSheetRouterOptions &
  BottomSheetNavigationConfig;

function BottomSheetNavigator({
  initialRouteName,
  defaultSnap,
  snapPoints,
  backBehavior,
  children,
  screenOptions,
  ...rest
}: Props) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    BottomSheetNavigationState,
    BottomSheetRouterOptions,
    BottomSheetNavigationOptions,
    BottomSheetNavigationEventMap
  >(BottomSheetRouter, {
    initialRouteName,
    defaultSnap,
    snapPoints,
    backBehavior,
    children,
    screenOptions,
  });

  return (
    <BottomSheetView
      {...rest}
      snapPoints={snapPoints}
      defaultSnap={defaultSnap}
      state={state}
      descriptors={descriptors}
      navigation={navigation}
    />
  );
}

export default createNavigatorFactory<
  BottomSheetNavigationState,
  BottomSheetNavigationOptions,
  BottomSheetNavigationEventMap,
  typeof BottomSheetNavigator
>(BottomSheetNavigator);
