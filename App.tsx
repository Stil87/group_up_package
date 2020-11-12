/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { isTemplateElement } from '@babel/types';
import React, { ReactComponentElement } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Animated,
  Pressable,
  ListRenderItem,
  PressableProps,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

interface CustomListItem { title: string, id: number }

const Data: CustomListItem[] = [
  { title: "hello", id: 1 },
  { title: "bye", id: 2 },
  { title: "love", id: 3 },
  { title: "Donald", id: 4 },
]
const DataTwo: CustomListItem[] = [
  { title: "Andrew", id: 1 },
  { title: "Berta", id: 2 },

]
let ScreenHeight = Dimensions.get("window").height;

/* class ListItem extends React.Component {

constructor (listItem) {
  super()
}

  render() {
    return (
      <Pressable


      onLayout={(event) => {
        let { x, y, width, height } = event.nativeEvent.layout
        console.log(listItem.title, x, y)
      }}

    >
      <View style={styles.listItemContainerStyle}
      >
        <Text style={styles.listItemTextStyle}>{listItem.title}</Text>
      </View>
    </Pressable>

    )
  };
} */



const getListItem = (listItem: CustomListItem, index: number,): any => {



  return (
    <Pressable
      


    onPress={(event) => {
      let x  = event.nativeEvent.locationX
      console.log(x)
    }}

    >
      <View style={styles.listItemContainerStyle}
      >
        <Text style={styles.listItemTextStyle}>{listItem.title}</Text>
      </View>
    </Pressable>

  )
}
/* 
const getItemPosition = (item:) =>{


}
 */
const App = () => {



  return (<View>
    <SafeAreaView
      style={[{ backgroundColor: "green" }, { flexDirection: "column" }, { height: ScreenHeight }]}

    >

      <FlatList
       

        style={[, { backgroundColor: "yellow" }]}
        horizontal
        data={Data}
        CellRendererComponent={({ item, index }) => {



          return getListItem(item, index)
        }

        }
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
      <View></View>
      <FlatList
        style={[{ backgroundColor: "yellow" }]}
        horizontal
        data={DataTwo}
        renderItem={({ item, index }) => getListItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>


    </SafeAreaView>

  </View>);
};

const styles = StyleSheet.create({
  listItemContainerStyle: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,

  },
  listItemTextStyle: {
    fontSize: 15,
    color: "white"

  }
});

export default App;
