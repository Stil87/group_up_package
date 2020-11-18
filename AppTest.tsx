import React from "react";
import {Image, SafeAreaView, View} from 'react-native';
import {Grouper, SourceList, TargetList} from './components/Grouper';

const testData: Array<{}> = [
  {
    title: 'Burnie',
    id: 'https://ca.slack-edge.com/T0WU5R8NT-U014XEG2PJ4-bb2847571bc1-512',
  },
  {
    title: 'Till',
    id: 'https://ca.slack-edge.com/T0WU5R8NT-U015FNL1RQF-87fa8c57d5ca-512',
  },
  {
    title: 'Andrew',
    id: 'https://ca.slack-edge.com/T0WU5R8NT-UREPE1AR2-d3cad052b4a2-512',
  },
  {
    title: 'steve',
    id: 'https://ca.slack-edge.com/T0WU5R8NT-U018DCLH4TG-ebb6b972770c-512',
  },
  {
    title: 'Berta',
    id: 'https://ca.slack-edge.com/T0WU5R8NT-UFCH43E4B-bf2eeac7c0fa-512',
  }

];

const APP = () => {
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          //position: 'relative',
        }}>
        <Grouper>
          <TargetList></TargetList>
          <View style={{backgroundColor: 'black', height: '80%'}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('./assests/friends.jpg')}
            />
          </View>
          <SourceList sourceListProp={testData} horizontal={true}></SourceList>
        </Grouper>
      </View>
    </SafeAreaView>
  );
};

export default APP;
