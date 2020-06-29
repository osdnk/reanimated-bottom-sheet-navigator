import type BottomSheet from 'reanimated-bottom-sheet';
import type {
  Route,
  ParamListBase,
  NavigationProp,
  Descriptor,
  NavigationHelpers,
  TabNavigationState,
  TabActionHelpers,
  TabActionType,
  TabRouterOptions,
  RouteProp,
} from '@react-navigation/native';

export type Scene = {
  route: Route<string>;
  focused: boolean;
  color?: string;
};

export type BottomSheetNavigationState = Omit<
  TabNavigationState,
  'type' | 'history'
> & {
  /**
   * Type of the router, in this case, it's bottom sheet.
   */
  type: 'bottom-sheet';
  /**
   * List of previously visited route keys and bottom sheet open status.
   */
  history: (
    | { type: 'route'; key: string }
    | { type: 'bottom-sheet'; point: number }
  )[];
};

export type BottomSheetActionHelpers<
  ParamList extends ParamListBase
> = TabActionHelpers<ParamList> & {
  /**
   * Open the bottom sheet.
   */
  openSheet(): void;

  /**
   * Close the bottom sheet.
   */
  closeSheet(): void;

  /**
   * Snap the bottom sheet to a specific point.
   */
  snapSheet(point: number): void;
};

export type BottomSheetActionType =
  | TabActionType
  | {
      type: 'OPEN_SHEET' | 'CLOSE_SHEET';
      source?: string;
      target?: string;
    }
  | {
      type: 'SNAP_SHEET';
      payload: { point: number };
      source?: string;
      target?: string;
    };

export type BottomSheetRouterOptions = TabRouterOptions & {
  defaultSnap?: number;
  snapPoints: number[];
};

export type BottomSheetNavigationConfig = Partial<
  Omit<React.ComponentProps<typeof BottomSheet>, 'initialSnap'>
> & {
  defaultSnap?: number;
  snapPoints: number[];
};

export type BottomSheetNavigationOptions = {};

export type BottomSheetNavigationEventMap = {
  /**
   * Event which fires when the bottom sheet starts opening.
   */
  sheetOpenStart: { data: undefined };
  /**
   * Event which fires when the bottom sheet starts closing.
   */
  sheetCloseStart: { data: undefined };
  /**
   * Event which fires when the bottom sheet ends opening.
   */
  sheetOpenEnd: { data: undefined };
  /**
   * Event which fires when the bottom sheet ends closing.
   */
  sheetCloseEnd: { data: undefined };
};

export type BottomSheetNavigationHelpers = NavigationHelpers<
  ParamListBase,
  BottomSheetNavigationEventMap
>;

export type BottomSheetNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = NavigationProp<
  ParamList,
  RouteName,
  BottomSheetNavigationState,
  BottomSheetNavigationOptions,
  BottomSheetNavigationEventMap
> &
  BottomSheetActionHelpers<ParamList>;

export type BottomSheetScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> = {
  navigation: BottomSheetNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};

export type BottomSheetDescriptor = Descriptor<
  ParamListBase,
  string,
  BottomSheetNavigationState,
  BottomSheetNavigationOptions
>;

export type BottomSheetDescriptorMap = {
  [key: string]: BottomSheetDescriptor;
};
