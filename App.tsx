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
  PanResponder,
  PanResponderInstance,
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

let ScreenHeight = Dimensions.get("window").height;

const initialElem: React.DetailedReactHTMLElement<{ style: any }, any>[] = []










/* 
const getItemPosition = (item:) =>{
  
  
}
*/
class App extends React.Component {


  state = {
    hidden: true,
    dragging: false,
    DataTwo: [
      { title: "Andrew", id: 1 },
      { title: "Berta", id: 2 },
      { title: "leo", id: 3 },
      { title: "jo cock", id: 4 },
      { title: "steve", id: 5 },
      { title: "inna", id: 6 },
      { title: "till", id: 7 },
      { title: "tobi", id: 8 },

    ]
  }

  _panResponder: PanResponderInstance
  point = new Animated.ValueXY()
  scrollOffSet = 0;
  flatListLayout = {}

  // size = new Animated.Value()

  constructor(props: {} | Readonly<{}>) {
    super(props)

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ dragging: true })
        console.log(gestureState.x0)
        this.setState({ hidden: false })

        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{
          y: this.point.y,
          x: this.point.x
        }], { useNativeDriver: false })({
          y: gestureState.moveY
          , x: gestureState.moveX
        })
        // console.log(gestureState.x0, 'hello')
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // console.log(gestureState.x0)
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  }




  render() {
    const { DataTwo, dragging, hidden } = this.state;

    const getListItem = ({ item }: any) =>
      (
        <View

          style={styles.listItemContainerStyle}
          {...this._panResponder.panHandlers}
        // {...console.log(item.title)}
        >
          <View
          >
            <Text style={styles.listItemTextStyle}>{item.title}</Text>
          </View>
        </View>

      )


    return (
      <View
        style={{ flex: 1 , flexDirection:"row"}}
      >
        {!hidden && <Animated.View style={{
          backgroundColor: "black", zIndex: 2, width: 30, position: "absolute",
          top: this.point.getLayout().top,
          left: this.point.getLayout().left
        }}>
          {getListItem({ item: 3 })}
        </Animated.View>}
        <FlatList
          //scrollEnabled={!dragging}
          scrollEventThrottle={16}

          style={{ backgroundColor: "yellow", flexGrow: 0 , alignSelf:"flex-end"}}
          horizontal
          onScroll={e => this.scrollOffSet = e.nativeEvent.contentOffset.x}
          onLayout={e => this.flatListLayout
            = (e.nativeEvent.layout)}
          data={DataTwo}
          renderItem={({ item, index }) => getListItem({ item })}
          keyExtractor={(item, index) => index.toString()}
        ></FlatList>

      </View>);
  }
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
