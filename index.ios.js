
'use strict';
var url_fragment = 'https://api.foursquare.com/v2/venues/search?';
var client_id = 'client_id=Z5KFTLNY0W2SOT3IEXFVTD21M4DS3GO2KZUKX02R0CFHLAD4';
var client_secret = '&client_secret=FG4HH4BBSTJG0HNXPMW0IZN0KPDWZXU50EAFKQFUSRD5G2JC';
var api_version = '&v=20130815';
var query = '&query=icecream';

var REQUEST = url_fragment + client_id + client_secret + api_version + '&ll=';

var _ = require('lodash-node');
var React = require('react-native');
var IceCreamList = require('./IceCreamList.ios');

var {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

var HelloWorld = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      initialPosition: {coords: {latitude: null, longitude: null}},
      lastPosition: {coords: {latitude: null, longitude: null}},
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1,row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
      var component = this;

      this.fetchData()
        .then((response) => response.json())
        .then((responseJSON) => {
          var venuesList = [];
          _.each(responseJSON.response.venues, function(resultItem){venuesList.push(resultItem)});
          var newList = this.state.dataSource.cloneWithRows(venuesList);
          component.setState({dataSource: newList});
        })
        .catch((error) => {
            console.warn(error);
        });
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  fetchData: function() {
    return fetch(REQUEST + this.state.lastPosition.coords.latitude + ',' + this.state.lastPosition.coords.longitude + query);
  },

  render: function() {
    return (
        <IceCreamList
          style={styles.container}
          dataSource={this.state.dataSource}
          initialPosition={this.state.initialPosition}
          lastPosition={this.state.lastPosition}
          renderHeader={this.renderHeader}>
        </IceCreamList>
  )}
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
