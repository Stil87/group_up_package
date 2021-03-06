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
import { SourceList, TargetList, Grouper } from './components/Grouper';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,

  Dimensions,
  Animated,

  PanResponder,
  PanResponderInstance,
} from 'react-native';



interface CustomListItem {
  title: string;
  id: number;
}
interface ClonePosition {
  x: number;
  y: number;
}

const Data: CustomListItem[] = [
  { title: 'hello', id: 1 },
  { title: 'bye', id: 2 },
  { title: 'love', id: 3 },
  { title: 'Donald', id: 4 },
];

let ScreenHeight = Dimensions.get("window").height;

const initialElem: React.DetailedReactHTMLElement<{ style: any }, any>[] = [];

const testDate: Array<{}> = [
  { title: 'Igor', id: "https://ca.slack-edge.com/T0WU5R8NT-U01A0HCC38Q-98e50b5ed662-512" },
  { title: 'Lukas', id: "https://ca.slack-edge.com/T0WU5R8NT-U015DNJ53CM-2c37d28c0241-512" },
  { title: 'Andrew', id: "https://ca.slack-edge.com/T0WU5R8NT-UREPE1AR2-d3cad052b4a2-512" },
  { title: 'steve', id: "https://ca.slack-edge.com/T0WU5R8NT-U018DCLH4TG-ebb6b972770c-512" },
  { title: 'Berta', id: "https://ca.slack-edge.com/T0WU5R8NT-UFCH43E4B-bf2eeac7c0fa-512" },
  { title: 'till', id: "https://ca.slack-edge.com/T0WU5R8NT-U015FNL1RQF-87fa8c57d5ca-512" },
  { title: 'tobi', id: "https://ca.slack-edge.com/T0WU5R8NT-U018CCQ10SG-69508aadc5c4-512" },
  /* 
  {title: 'no', id: 6},
  {title: 'what', id: 7},
  {title: 'is ', id: 8},
  {title: 'here', id: 9}, */
];

/* 
const getItemPosition = (item:) =>{
  
  
}
*/
interface AppState {
  point: Animated.ValueXY;
  flightY: Animated.Value;
  draggingIndex: number;
  currentItem: CustomListItem;
  hidden: boolean;
  dragging: boolean;
  DataTwo: CustomListItem[];
  DataThree: CustomListItem[];
}

// const grouper = new Grouper({sourceList: testDate}); ///_____-------------------

class App extends React.Component {
  state: AppState = {
    point: new Animated.ValueXY(),
    flightY: new Animated.Value(0),

    currentItem: { title: 'hello', id: 1 },
    draggingIndex: -1,
    hidden: true,
    dragging: false,
    DataTwo: [
      { title: 'Andrew', id: 1 },
      { title: 'Berta', id: 2 },
      { title: 'leo', id: 3 },
      { title: 'jo cock', id: 4 },
      { title: 'steve', id: 5 },
      { title: 'inna', id: 6 },
      { title: 'till', id: 7 },
      { title: 'tobi', id: 8 },
    ],
    DataThree: [{ title: 'Andrew', id: 1 }],
  };

  _panResponder: PanResponderInstance;
  Flight = new Animated.ValueXY();
  scrollOffSet = 0;
  flatListLayoutOffset = 0;
  listItemHeight = 0;
  listItemWidth = 0;
  currentIndex = -1;

  // size = new Animated.Value()

  constructor(props: {} | Readonly<{}>) {
    super(props);

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log(this.listItemHeight, 'itemheight');
        this.setState({ hidden: false });
        this.setState({ dragging: true });
        this.currentIndex = this.xToIndex(gestureState.x0);
        this.setState({ draggingIndex: this.currentIndex });

        // console.log(this.currentIndex, 'current Index')
        this.setState({ currentItem: this.state.DataTwo[this.currentIndex] });
        // console.log(gestureState.x0, 'Gesture x0 mouse exact')
        // console.log(gestureState.y0, 'Gesture y0 mouse exact')
        // console.log(this.currentIndex, 'current Item')
        // console.log(this.currentIndex, 'current Item')

        Animated.event(
          [
            {
              y: this.state.point.y,
              x: this.state.point.x,
            },
          ],
          { useNativeDriver: false },
        )({
          y: gestureState.y0 - this.listItemHeight / 2,

          x: gestureState.x0 - this.listItemWidth / 2,
        });

        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event(
          [
            {
              y: this.state.point.y,
              x: this.state.point.x,
            },
          ],
          { useNativeDriver: false },
        )({
          y: gestureState.moveY - this.listItemHeight / 2,

          x: gestureState.moveX - this.listItemWidth / 2,
        });

        console.log(gestureState.moveY, 'gesture State Release');
        // console.log(gestureState.x0, 'hello')
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // console.log(gestureState.x0)
        console.log(this.state.DataThree, 'datathree');
        const currentItemSave = this.state.DataTwo[this.currentIndex];
        console.log(currentItemSave, 'CURRENTITEMSAVE');
        Animated.timing(this.state.point.y, {
          toValue: -300,
          duration: 1500,
          useNativeDriver: false,
        }).start(() => {
          this.setState({
            DataThree: [...this.state.DataThree, currentItemSave],
          });
          console.log(this.state.DataThree, 'datathreeAFter');
        });
        const myArray = this.state.DataTwo;

        if (this.currentIndex > -1) {
          myArray.splice(this.currentIndex, 1);
        }
        this.setState({ DataTwo: myArray, draggingIndex: -1 });
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  xToIndex = (x: number) =>
    Math.floor(
      (this.scrollOffSet + x - this.flatListLayoutOffset) / this.listItemWidth,
    );

  render() {
    const { DataTwo, dragging, hidden, draggingIndex } = this.state;

    const getListItem = ({ item }: any, index: number) => (
      <View
        onLayout={(e) => {
          this.listItemHeight = e.nativeEvent.layout.height;
          this.listItemWidth = e.nativeEvent.layout.width;
        }}
        {...this._panResponder.panHandlers}
        style={[
          styles.listItemContainerStyle,
          { opacity: draggingIndex === index ? 0 : 1 },
        ]}
      // {...console.log(item.title)}
      >
        <View>
          <Text style={styles.listItemTextStyle}>{item.title}</Text>
        </View>
      </View>
    );





    return (
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
          }}>
          <Grouper>
            <TargetList></TargetList>
            <View style={{ backgroundColor: "black", height: "80%" }}></View>
            <SourceList
              sourceListProp={testDate}
              horizontal={true}
            ></SourceList>
          </Grouper>

          {/*  <FlatList
          horizontal
          data={this.state.DataThree}
          renderItem={({ item, index }) => getListItem({ item }, index)}
          style={{ backgroundColor: "yellow", flexGrow: 0, alignSelf: "flex-start", width: "100%" }}
          keyExtractor={(item, index) => index.toString()}
          
          
          
          ></FlatList>
          {!hidden && <Animated.View style={{
            backgroundColor: "black", zIndex: 2, position: "absolute",
            top: this.state.point.getLayout().top,
            left: this.state.point.getLayout().left
          }}>
          {getListItem({ item: this.state.currentItem })}
          </Animated.View>}
          <FlatList
          //scrollEnabled={!dragging}
          scrollEventThrottle={16}
          // contentContainerStyle={{justifyContent:"center", flexDirection:"row"}}
          
          style={{ backgroundColor: "yellow", flexGrow: 0, alignSelf: "flex-end", width: "100%" }}
          horizontal
          onScroll={e => this.scrollOffSet = e.nativeEvent.contentOffset.x}
          onLayout={e => this.flatListLayoutOffset
            = (e.nativeEvent.layout.x)}
            data={this.state.DataTwo}
            renderItem={({ item, index }) => getListItem({ item }, index)}
            keyExtractor={(item, index) => index.toString()}
          ></FlatList>
 */}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainerStyle: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  listItemTextStyle: {
    fontSize: 15,
    color: 'white',
  },
});

export default App;
