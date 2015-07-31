/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var url_fragment = 'https://api.foursquare.com/v2/venues/search?';
var client_id = 'client_id=Z5KFTLNY0W2SOT3IEXFVTD21M4DS3GO2KZUKX02R0CFHLAD4';
var client_secret = '&client_secret=FG4HH4BBSTJG0HNXPMW0IZN0KPDWZXU50EAFKQFUSRD5G2JC';
var api_version = '&v=20130815';
var query = '&query=icecream';

var REQUEST = url_fragment + client_id + client_secret + api_version + '&ll=';

var _ = require('lodash-node');
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
} = React;

var request;

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
      var iceCreamList = [];

      this.fetchData()
        .then((response) => response.json())
        .then((responseJSON) => {
          var namesList = [];
          _.each(responseJSON.response.venues, function(resultItem){namesList.push(resultItem.name)});
          var newList = this.state.dataSource.cloneWithRows(namesList);
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
  renderListItem: function(listItem){
    return (
      <Text>{listItem}</Text>
    );
  },
  render: function() {
    return (
      <View>
        <View>
          <Text>
            <Text style={styles.title}>Initial position: </Text>
            {this.state.initialPosition.latitude}
          </Text>
          <Text>
            <Text style={styles.title}>Current position: </Text>
            {JSON.stringify(this.state.lastPosition.coords.latitude)}
          </Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderListItem}
        />
    </View>
  )}
});

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
