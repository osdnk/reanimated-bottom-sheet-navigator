# Bottom Sheet Navigator

React Navigation integration for [Reanimated Bottom Sheet](https://github.com/osdnk/react-native-reanimated-bottom-sheet).

```sh
npm install @react-navigation/native reanimated-bottom-sheet-navigator reanimated-bottom-sheet
```

## API Definition

To use this navigator, import it from `reanimated-bottom-sheet-navigator`:

```js
import { createBottomSheetNavigator } from 'reanimated-bottom-sheet-navigator';

const Sheet = createBottomSheetNavigator();

function MySheet() {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'tomato',
        height: 300,
      }}
    >
      <Text>Content</Text>
    </View>
  );

  return (
    <Sheet.Navigator snapPoints={[300, 100, 0]} renderContent={renderContent}>
      <Sheet.Screen name="Home" component={Home} />
      <Sheet.Screen name="Notifications" component={Notifications} />
      <Sheet.Screen name="Profile" component={Profile} />
      <Sheet.Screen name="Settings" component={Settings} />
    </Sheet.Navigator>
  );
}
```

### Props

The `Sheet.Navigator` component accepts the same props as [Reanimated Bottom Sheet](https://github.com/osdnk/react-native-reanimated-bottom-sheet) except `initialSnap`, which is replaced by `defaultSnap`:

#### `defaultSnap`

Determines initial and default snap point of bottom sheet - the bottom sheet will start at this snap point and after opening it, it'll go back to this snap point when back button is pressed. The value is the `index` from `snapPoints`.

### Events

The navigator can [emit events](https://reactnavigation.org/docs/navigation-events) on certain actions. Supported events are:

#### `sheetOpenStart`

This event is fired when the bottom sheet starts opening.

Example:

```js
React.useEffect(() => {
  const unsubscribe = navigation.addListener('sheetOpenStart', (e) => {
    // Do something
  });

  return unsubscribe;
}, [navigation]);
```

#### `sheetOpenEnd`

This event is fired when the bottom sheet opens completely.

Example:

```js
React.useEffect(() => {
  const unsubscribe = navigation.addListener('sheetOpenEnd', (e) => {
    // Do something
  });

  return unsubscribe;
}, [navigation]);
```

#### `sheetCloseStart`

This event is fired when the bottom sheet starts closing.

Example:

```js
React.useEffect(() => {
  const unsubscribe = navigation.addListener('sheetCloseStart', (e) => {
    // Do something
  });

  return unsubscribe;
}, [navigation]);
```

#### `sheetCloseEnd`

This event is fired when the bottom sheet closes completely.

Example:

```js
React.useEffect(() => {
  const unsubscribe = navigation.addListener('sheetCloseEnd', (e) => {
    // Do something
  });

  return unsubscribe;
}, [navigation]);
```

### Helpers

The drawer navigator adds the following methods to the navigation prop:

#### `openSheet`

Opens the bottom sheet fully.

```js
navigation.openSheet();
```

#### `closeSheet`

Closes bottom sheet to its default position (specified in `defaultSnap`).

```js
navigation.closeSheet();
```

#### `snapSheet`

Snaps bottom sheet to a specific snap point.The method accepts following arguments:

- `snapPoint` - _number_ - The `index` of the point specified in the `snapPoints` prop.

```js
navigation.snapSheet(1);
```

#### `jumpTo`

Navigates to an existing screen in the bottom sheet navigator. The method accepts following arguments:

- `name` - _string_ - Name of the route to jump to.
- `params` - _object_ - Screen params to merge into the destination route (found in the pushed screen through `route.params`).

```js
navigation.jumpTo('Profile', { owner: 'Michał' });
```

## Nesting bottom sheet navigators inside others

If a bottom sheet navigator is nested inside of another navigator that provides some UI, for example a tab navigator or stack navigator, then the bottom sheet will be rendered below the UI from those navigators. The bottom sheet will appear below the tab bar and below the header of the stack. You will need to make the bottom sheet navigator the parent of any navigator where the bottom sheet should be rendered on top of its UI.
