/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  PanResponder,
  PanResponderInstance,
  PointPropType,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

/* 

const grouper = (newList, setTargetList ) => {
  setTargetList(newList);
  TargetList(newList, ()=>)
}

const GlobalTargetList = []

 */

const Grouper = (props) => {
  const [targetListGrouper, setTargetListGrouper] = useState([]);
  const [targetListLocationProp, settargetListLocation] = useState(0);
  const source = props.children[2];
  const middle = props.children[1];
  const target = props.children[0];
  const sendItems = (item) => {
    setTargetListGrouper((list) => [...list, item]);
  };
  const sendLocation = (x) => {
    settargetListLocation(x);
  };

  return (
    <>
      {[
        React.cloneElement(target, {
          key: '0',
          setTargetListGrouper,
          targetListGrouper,
          sendLocation,
        }),
        ,
        React.cloneElement(middle, {key: '1'}),
        React.cloneElement(source, {
          key: '2',
          sendItems,
          settargetListLocation,
          targetListLocationProp,
        }),
      ]}
    </>
  )

};

const TargetList = ({targetListGrouper, sendLocation}) => {
  const [targetList, setTargetList] = useState(targetListGrouper);
  let location = 0;
  useEffect(() => {
    setTargetList((list) => [...targetListGrouper]);
    return () => {};
  }, [targetListGrouper]);

  const getListItem = (item, index) => {
    // console.log(item,'item from get list item')

    return (
      <View
        style={{
          height: 60,
          width: 60,
          borderRadius: 58,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
        }}>
        <Image style={{width: 53, height: 53, borderRadius:53}} source={{uri: item.id}}></Image>
      </View>
    )

  };

  return (
    <>
      <FlatList
        horizontal
        data={targetList}
        renderItem={({item, index}) => {
          return getListItem(item, index);
        }}
        keyExtractor={(item, index) => index + ''}
        style={{flexGrow: 0, backgroundColor: 'black'}}
        scrollEventThrottle={16}
        onLayout={(e) => {
          sendLocation(e.nativeEvent.layout.y);
        }}
      />
    </>
  );
};

const SourceList = (props: any) => {
  const {
    sourceListProp,
    horizontal,
    styles,
    sendItems,
    targetListLocationProp,
    itemCreate,
  } = props;


  const [sourceList, setsourceList] = useState(sourceListProp);
  const [targetListLocation, settargetListLocation] = useState(
    targetListLocationProp,
  );
  const [sourceListLocation, setSourceListLocation] = useState(0);

  useEffect(() => {
    settargetListLocation(targetListLocationProp);
    return () => {};
  }, [targetListLocationProp])


  const [currentItem, setcurrentItem] = useState({});
  const [hidden, sethidden] = useState(true);
  const [draggingIndex, setdraggingIndex] = useState(-1);

  let animatedItemPoint = useRef(new Animated.ValueXY()).current;
  // const [animatedItemPoint, setanimatedItemPoint] = useState(new Animated.ValueXY())
  let currentItemIndex = -1;
  let listItemWidth = 0;
  let listItemHeight = 0;
  let scrollOffSet = 0;
  let flatListLayoutX = 0;
  let flatListLayoutY = 0;
  let counter = 0;

  // console.log(Dimensions.get('window').height)

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now

        // console.log(listItemWidth, 'list ITem Width layout value')
        // console.log(xToIndex(gestureState.x0), 'gesture state Grantt X index to ')
        sethidden(false);
        currentItemIndex = xToIndex(gestureState.x0);
        setdraggingIndex(currentItemIndex)


        setcurrentItem(sourceList[currentItemIndex]);

        Animated.event(
          [
            {
              y: animatedItemPoint.y,
              x: animatedItemPoint.x,
            },
          ],
          {useNativeDriver: false},
        )({
          y: gestureState.y0 - 50 - listItemHeight / 2,
          x: gestureState.x0 - listItemWidth / 2,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        Animated.event(
          [
            {
              y: animatedItemPoint.y,
              x: animatedItemPoint.x,
            },
          ],
          {useNativeDriver: false},
        )({
          y: gestureState.moveY - 50 - listItemHeight / 2,
          x: gestureState.moveX - listItemWidth / 2,
        });

       
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        console.log(gestureState.dy, 'Release velocity');

        const currentItem = sourceList[currentItemIndex];

        Animated.decay(animatedItemPoint, {
          /*   toValue: sourceListLocation +60 - targetListLocation ,
           duration: 1000, */

          useNativeDriver: false,
          velocity: {x: gestureState.vx, y: gestureState.vy},
          deceleration: 0.996,
        }).start(() => {
          Animated.timing(animatedItemPoint, {
            toValue: {
              y: sourceListLocation + 40 - targetListLocation,
              x: counter * listItemWidth,
            },
            duration: 500,
            useNativeDriver: false,
          }).start(() => {
            sendItems(currentItem);
            sethidden(true);
            counter++;
          });
        });


        const newSourceList = sourceList;
        if (currentItemIndex > -1) {
          newSourceList.splice(draggingIndex, 1);
        }
        setsourceList(newSourceList);
        setdraggingIndex(-1);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelledr
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  const xToIndex = (x: number) =>
    Math.floor((scrollOffSet + x - flatListLayoutX) / listItemWidth);

  const getListItem = (item, index) => {
    return (
      <View
        onLayout={(e) => {
          listItemWidth = e.nativeEvent.layout.width;
          listItemHeight = e.nativeEvent.layout.height;

          // console.log(listItemHeight, listItemWidth)
        }}
        {...panResponder.panHandlers}
        style={{
          opacity: draggingIndex === index ? 0 : 1,
          height: 60,
          width: 60,
          borderRadius: 50,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
        }}>
        <Image style={{width: 53, height: 53, borderRadius:53}} source={{uri: item.id}}></Image>
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={sourceList}
        renderItem={({item, index}) => getListItem(item, index)}
        keyExtractor={(item, index) => index + ''}
        horizontal={horizontal}
        style={{flexGrow: 0, backgroundColor: 'black'}}
        scrollEventThrottle={16}
        onScroll={e => scrollOffSet = e.nativeEvent.contentOffset.x}
        onLayout={(e) => {
          setSourceListLocation(e.nativeEvent.layout.y);
          flatListLayoutX = e.nativeEvent.layout.x;
          flatListLayoutY = e.nativeEvent.layout.y;
        }}
      />

      {!hidden && (
        <Animated.View
          style={{
            top: animatedItemPoint.getLayout().top,
            left: animatedItemPoint.getLayout().left,
            zIndex: 2,
            position: 'absolute',
            height: 60,
            width: 60,
            borderRadius: 50,
            backgroundColor: 'blue',

            margin: 0,
          }}>
          {getListItem(currentItem)}
        </Animated.View>
      )}
    </>
  );
};

export {SourceList, TargetList, Grouper};
