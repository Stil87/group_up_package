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
import React, { ReactComponentElement, useState } from 'react';
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
interface ClonePosition { x: number, y: number }

const Data: CustomListItem[] = [
  { title: "hello", id: 1 },
  { title: "bye", id: 2 },
  { title: "love", id: 3 },
  { title: "Donald", id: 4 },
]
const DataTwo: CustomListItem[] = [
  { title: "Andrew", id: 1 },
  { title: "Berta", id: 2 },
  { title: "leo", id: 3 },

]
let ScreenHeight = Dimensions.get("window").height;

const initialElem: React.DetailedReactHTMLElement<{ style: any }, any>[] = []










/* 
const getItemPosition = (item:) =>{
  
  
}
*/
const App = () => {
  const [cloneArray, setCloneArray] = useState(initialElem)

  const getListItem = (listItem: CustomListItem,): any => {



    return (
      <Pressable

        style={styles.listItemContainerStyle}


        onPress={(event) => {
          
          let x = event.nativeEvent.locationX
          let y = event.nativeEvent.locationY
          // let y = event.currentTarget.getBo
          console.log(x, y)
          addItemToCloneArray(listItem, { x, y })


        }}

      >
        <View
        >
          <Text style={styles.listItemTextStyle}>{listItem.title}</Text>
        </View>
      </Pressable>

    )
  }

  const addItemToCloneArray = (listItem: CustomListItem, clonePosition: ClonePosition) => {
    const cloneListItem = getListItem(listItem)
    console.log('cloneList', cloneListItem)
    const clone = React.cloneElement(cloneListItem,
      { style: { position: "absolute", top: clonePosition.y, left: clonePosition.x, backgroundColor: "red" } })
    /*  const clone = React.cloneElement(cloneListItem,
       { className ="hero" }) */
    console.log('clone', clone)

    setCloneArray([clone])
  }


  return (<View>
    <SafeAreaView
      style={[{ backgroundColor: "green" }, { flexDirection: "column" }, { height: ScreenHeight }]}
    >


      <FlatList


        style={[, { backgroundColor: "yellow" }]}
        horizontal
        data={Data}
        CellRendererComponent={({ item, index }) => {



          return getListItem(item)
        }

        }
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
      <View></View>
      <FlatList
        style={[{ backgroundColor: "yellow" }]}
        horizontal
        data={DataTwo}
        renderItem={({ item, index }) => getListItem(item)}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
      <View>{cloneArray.map(el => <>{el}</>)}</View>

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
