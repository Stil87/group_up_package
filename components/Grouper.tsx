import React, { useState, useRef } from "react";
import { Animated, Dimensions, FlatList, PanResponder, PanResponderInstance, PointPropType, SafeAreaView, Text, View } from "react-native";




const Grouper = () => {


}

const SourceList = (props: any) => {
  const { sourceList, horizontal, styles } = props


  const [currentItem, setcurrentItem] = useState({})
  const [hidden, sethidden] = useState(true)
  const [gestureStateY, setgestureStateY] = useState(0)

 let animatedItemPoint = useRef(new Animated.ValueXY()).current
  // const [animatedItemPoint, setanimatedItemPoint] = useState(new Animated.ValueXY())
  let currentItemIndex=-1
  let listItemWidth = 0
  let listItemHeight = 0
  let scrollOffSet = 0
  let flatListLayoutX = 0
  let flatListLayoutY = 0

  console.log( Dimensions.get('window').height)


  // Interface Item  typeof sourceList[0]


  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        console.log(gestureState.y0, 'gesture state Grantt')
        console.log(flatListLayoutY, 'flatlistLayout Y')
        setgestureStateY(gestureState.y0)
        

        // console.log(listItemWidth, 'list ITem Width layout value')
        // console.log(xToIndex(gestureState.x0), 'gesture state Grantt X index to ')
        sethidden(false)
        currentItemIndex = xToIndex(gestureState.x0)

        // console.log(currentItemIndex, 'here currentItemIndes')

        // console.log(sourceList[currentItemIndex])
        setcurrentItem(sourceList[currentItemIndex])

        Animated.event(
          [{
            y: animatedItemPoint.y,
            x: animatedItemPoint.x
          }],
          { useNativeDriver: false }
        )
          ({
            y: gestureState.y0 -50  - listItemHeight / 2,
            x: gestureState.x0 - listItemWidth / 2
          })
        // console.log(currentItem, 'here')
        console.log(animatedItemPoint, 'animated point')

      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        Animated.event(
          [{
            y: animatedItemPoint.y,
            x: animatedItemPoint.x
          }],
          { useNativeDriver: false }
        )
          ({
            y: gestureState.moveY -50 - listItemHeight/2,
            x: gestureState.moveX - listItemWidth/2
          })

        console.log(animatedItemPoint, 'here')

      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        Animated.timing(
          animatedItemPoint.y, { toValue: -300, duration: 1000, useNativeDriver: false }
        ).start(() => {
          console.log('animation over')
        })
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
  ).current;


  const xToIndex = (x: number) => Math.floor((scrollOffSet + x - flatListLayoutX) / listItemWidth)




  const getListItem = (item) => {

    return (
      <View
        onLayout={e => {

          listItemWidth = e.nativeEvent.layout.width
          listItemHeight = e.nativeEvent.layout.height

          console.log(listItemHeight, listItemWidth)

        }}
        {...panResponder.panHandlers}

        style={{
          height: 60,
          width: 60,
          borderRadius: 50,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
        }}

      >

        <Text>{item.title}</Text>
      </View>
    )

  }
  return (

    <>
      <FlatList
        data={sourceList}
        renderItem={({ item }) => getListItem(item)}
        keyExtractor={item => item.id + ''}
        horizontal={horizontal}
        style={{ flexGrow: 0, backgroundColor: "green" }}


        scrollEventThrottle={16}
        onScroll={e => scrollOffSet = e.nativeEvent.contentOffset.x}
        onLayout={e => { 
          flatListLayoutX = e.nativeEvent.layout.x 
          flatListLayoutY = e.nativeEvent.layout.y
        }}
      >
      </FlatList>
     

      { !hidden && <Animated.View
      {...console.log(animatedItemPoint.getLayout().top,  'top in flat list')}
      style={{
        top:animatedItemPoint.getLayout().top,
        left: animatedItemPoint.getLayout().left, zIndex: 2, position: "absolute",
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: "blue",
        
        margin: 0,
      }}
      >
        {getListItem(currentItem)}
      </Animated.View>}
    </>
  )





};










export default SourceList;