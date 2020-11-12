/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

interface item { title: string, id: number }

const Data: {}[] = [
  { title: "hello" },
  { title: "bye" },
  { title: "love" },
  { title: "Donald" },
]

declare const global: { HermesInternal: null | {} };



const App = () => {

  let animation = new Animated.Value(1)
  let movingAnimation = new Animated.Value(0)
  let backgroundAnimation = new Animated.Value(0)

  const backgroundAnimationInterpolation =
    backgroundAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
    })
  const backgroundStyle = {
    backgroundColor: backgroundAnimationInterpolation
  }
  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: movingAnimation,
      },
      /*   {
  
          translateX: movingAnimation
        } */
    ]
  }

  function onPress(item: item) {
    console.log('just clicked :', item.id)
    //animation.addListener(value => console.log(value))
    Animated.timing(animation, {
      useNativeDriver: false,
      toValue: 0.5,
      duration: 500
    }).start()
    Animated.timing(movingAnimation, {
      useNativeDriver: false,
      toValue: -300,
      duration: 5000

    }).start()
  }

  return (

    <View 
    
   /*  style={

      [
        { flexDirection: "row" }
        , { flex: 1 }]

    } */
    >


      <Animated.FlatList
        scrollEventThrottle={16}
        onScroll={Animated.event([

          {
            nativeEvent: {
              contentOffset: {
                x: backgroundAnimation
              }
            }
          },


        ], { useNativeDriver: false })}
        keyExtractor={(item) => item.id.toString()}
        style={[{ alignSelf: "flex-end" }, { backgroundColor: "black" }]}
        horizontal
        data={[
          { title: "Hello", id: 1 },
          { title: "no", id: 2 },
          { title: "oh", id: 3 },
          { title: "yeah", id: 4 }
        ]}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={[{ backgroundColor: Colors.green }, ]}
            key={item.id.toString()}
            onPress={() => onPress(item)}
          >


            <Animated.View style={[{ margin: 24 },
              backgroundStyle,
            { borderColor: "blue" },
              animatedStyle,
             //, { position: 'absolute' }, {top:20}, {left:20}
              ]}>
              <Text style={[{ fontSize: 32 }, { color: Colors.white }]}>{item.title}</Text>
            </Animated.View>
          </TouchableHighlight>
        )}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,

  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
