import { nanoid } from 'nanoid/non-secure';
import {
  TabRouter,
  TabActions,
  TabActionType,
  PartialState,
  CommonNavigationAction,
  Router,
} from '@react-navigation/native';
import type {
  BottomSheetNavigationState,
  BottomSheetActionType,
  BottomSheetRouterOptions,
} from './types';

export const BottomSheetActions = {
  ...TabActions,
  openSheet(): BottomSheetActionType {
    return { type: 'OPEN_SHEET' };
  },
  closeSheet(): BottomSheetActionType {
    return { type: 'CLOSE_SHEET' };
  },
  snapSheet(point: number): BottomSheetActionType {
    return { type: 'SNAP_SHEET', payload: { point } };
  },
};

const isBottomSheetOpen = (
  state: BottomSheetNavigationState | PartialState<BottomSheetNavigationState>
) => state.history?.some((it) => it.type === 'bottom-sheet');

const snapBottomSheet = (
  state: BottomSheetNavigationState,
  point: number
): BottomSheetNavigationState => {
  const sheetState = state.history?.find((it) => it.type === 'bottom-sheet') as
    | { type: 'bottom-sheet'; point: number }
    | undefined;

  if (sheetState && sheetState.point === point) {
    return state;
  }

  if (sheetState) {
    return {
      ...state,
      history: state.history.map((it) => {
        if (it.type === 'bottom-sheet') {
          return { ...it, point };
        }

        return it;
      }),
    };
  }

  return {
    ...state,
    history: [...state.history, { type: 'bottom-sheet', point }],
  };
};

const closeBottomSheet = (
  state: BottomSheetNavigationState
): BottomSheetNavigationState => {
  if (!isBottomSheetOpen(state)) {
    return state;
  }

  return {
    ...state,
    history: state.history.filter((it) => it.type !== 'bottom-sheet'),
  };
};

export default function BottomSheetRouter({
  defaultSnap,
  snapPoints,
  ...rest
}: BottomSheetRouterOptions): Router<
  BottomSheetNavigationState,
  BottomSheetActionType | CommonNavigationAction
> {
  const router = (TabRouter(rest) as unknown) as Router<
    BottomSheetNavigationState,
    TabActionType | CommonNavigationAction
  >;

  return {
    ...router,

    type: 'bottom-sheet',

    getInitialState({ routeNames, routeParamList }) {
      let state = router.getInitialState({ routeNames, routeParamList });

      if (
        typeof defaultSnap === 'number' &&
        defaultSnap !== snapPoints.length - 1
      ) {
        state = snapBottomSheet(state, defaultSnap);
      }

      return {
        ...state,
        stale: false,
        type: 'bottom-sheet',
        key: `bottom-sheet-${nanoid()}`,
      };
    },

    getRehydratedState(partialState, { routeNames, routeParamList }) {
      if (partialState.stale === false) {
        return partialState;
      }

      let state = router.getRehydratedState(partialState, {
        routeNames,
        routeParamList,
      });

      const sheetState = partialState.history?.find(
        (it) => it.type === 'bottom-sheet'
      ) as { type: 'bottom-sheet'; point: number } | undefined;

      if (sheetState) {
        state = snapBottomSheet(state, sheetState.point);
      }

      return {
        ...state,
        type: 'bottom-sheet',
        key: `bottom-sheet-${nanoid()}`,
      };
    },

    getStateForRouteFocus(state, key) {
      const result = router.getStateForRouteFocus(state, key);

      if (
        typeof defaultSnap === 'number' &&
        defaultSnap !== snapPoints.length - 1
      ) {
        state = snapBottomSheet(state, defaultSnap);
      }

      return closeBottomSheet(result);
    },

    getStateForAction(state, action, options) {
      switch (action.type) {
        case 'OPEN_SHEET':
          return snapBottomSheet(state, 0);

        case 'CLOSE_SHEET':
          return closeBottomSheet(state);

        case 'SNAP_SHEET':
          if (action.payload.point === snapPoints.length - 1) {
            return closeBottomSheet(state);
          }

          return snapBottomSheet(state, action.payload.point);

        case 'GO_BACK':
          if (
            typeof defaultSnap === 'number' &&
            defaultSnap !== snapPoints.length - 1
          ) {
            if (!isBottomSheetOpen(state)) {
              return snapBottomSheet(state, 0);
            }
          } else {
            if (isBottomSheetOpen(state)) {
              return closeBottomSheet(state);
            }
          }

          return router.getStateForAction(state, action, options);

        default:
          return router.getStateForAction(state, action, options);
      }
    },

    actionCreators: BottomSheetActions,
  };
}
