/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';

type Props = {};
export default class App extends Component<Props> {

  state = {
    events: []
  }

  async componentDidMount() {
    const startDate = new Date('2016-01-01T00:00:00');
    const endDate = new Date('2020-12-31T23:59:59');
  
    await RNCalendarEvents.authorizeEventStore();
    
    const calendars = await RNCalendarEvents.findCalendars();
    console.log(calendars);
  
    const prom = [];
  
    calendars.forEach((calendar) => {
      prom.push(
        RNCalendarEvents.fetchAllEvents(startDate, endDate, [calendar.id])
      );
    });

    const eventsArray = await Promise.all(prom);
    

    const toto = [];
    eventsArray.forEach((events) => {
      console.log(events);
      events.forEach((event) => {
        toto.push({
          ...event,
          key: `${event.id}/${event.occurrenceDate}`,
        });
      });
    });

    this.setState({events: toto});
  }


  render() {
    return (
      <FlatList
        data={this.state.events}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
