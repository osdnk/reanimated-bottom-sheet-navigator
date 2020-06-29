import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomSheetNavigator,
  BottomSheetScreenProps,
} from 'reanimated-bottom-sheet-navigator';

type SheetParamList = {
  Hello: undefined;
};

const Sheet = createBottomSheetNavigator<SheetParamList>();

const HelloScreen = ({
  navigation,
}: BottomSheetScreenProps<SheetParamList>) => (
  <View style={styles.screen}>
    <Button title="Open sheet" onPress={navigation.openSheet} />
    <Button title="Close sheet" onPress={navigation.closeSheet} />
    <Button title="Snap to middle" onPress={() => navigation.snapSheet(1)} />
  </View>
);

export default function App() {
  const renderContent = () => <Text style={styles.sheet}>Hello world</Text>;

  return (
    <NavigationContainer>
      <Sheet.Navigator
        snapPoints={[300, 100, 0]}
        borderRadius={15}
        renderContent={renderContent}
      >
        <Sheet.Screen name="Hello" component={HelloScreen} />
      </Sheet.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#111',
    color: 'white',
    height: 300,
    padding: 24,
  },
  screen: {
    flex: 1,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
