import React from "react";
import { Animated, Pressable, View } from "react-native";




interface ListItem {
  title: string,


}


exports.getListItem = (listItem: ListItem, func: Function) => {

  return (
    <Pressable
      //onPress={func}
    >
      <View>
        {listItem.title}
      </View>


    </Pressable>



  )
}