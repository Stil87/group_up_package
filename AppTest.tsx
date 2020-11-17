import React from "react";
import {SafeAreaView, View} from 'react-native';
import {Grouper, SourceList, TargetList} from './components/Grouper';

const testDate: Array<{}> = [
  {
    title: 'Igor',
    id: 'https://ca.slack-edge.com/T0WU5R8NT-U014XEG2PJ4-bb2847571bc1-512',
  },
  {
    title: 'Lukas',
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
  },
  /* 
  {
    title: 'till',
    id: 'https://ca.slack-edge.com/T0WU5R8NT-U015FNL1RQF-87fa8c57d5ca-512',
  },
  { title: 'tobi', id: 'https://ca.slack-edge.com/T0WU5R8NT-U018CCQ10SG-69508aadc5c4-512' },
  {title: 'no', id: 6},
  {title: 'what', id: 7},
  {title: 'is ', id: 8},
  {title: 'here', id: 9}, */
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
          <View style={{backgroundColor: 'black', height: '80%'}}></View>
          <SourceList sourceListProp={testDate} horizontal={true}></SourceList>
        </Grouper>
      </View>
    </SafeAreaView>
  );
};

export default APP;
