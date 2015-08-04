//
// 'use strict';
// var url_fragment = 'https://api.foursquare.com/v2/venues/search?';
// var client_id = 'client_id=Z5KFTLNY0W2SOT3IEXFVTD21M4DS3GO2KZUKX02R0CFHLAD4';
// var client_secret = '&client_secret=FG4HH4BBSTJG0HNXPMW0IZN0KPDWZXU50EAFKQFUSRD5G2JC';
// var api_version = '&v=20130815';
// var query = '&query=icecream';
//
// var REQUEST = url_fragment + client_id + client_secret + api_version + '&ll=';
//
// var _ = require('lodash-node');
// var React = require('react-native');
// var MapViewExample = require('./MapViewExample.ios');
//
// var {
//   Component,
//   AppRegistry,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   ListView,
//   View,
// } = React;
//
// class HelloWorld extends Component {
//   constructor() {
//     super();
//     this.watchID = (null: ?number);
//   }
//
//   getInitialState() {
//     return {
//       initialPosition: {coords: {latitude: null, longitude: null}},
//       lastPosition: {coords: {latitude: null, longitude: null}},
//       dataSource: new ListView.DataSource({
//         rowHasChanged: (row1,row2) => row1 !== row2,
//       }),
//       loaded: false,
//     };
//   }
//
//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(
//       (initialPosition) => this.setState({initialPosition}),
//       (error) => alert(error.message),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//     );
//
//     this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
//       this.setState({lastPosition});
//       var component = this;
//       var iceCreamList = [];
//
//       this.fetchData()
//         .then((response) => response.json())
//         .then((responseJSON) => {
//           var namesList = [];
//           console.log('component mounted. storing ice cream in dataSource')
//           _.each(responseJSON.response.venues, function(resultItem){namesList.push(resultItem)});
//           var newList = this.state.dataSource.cloneWithRows(namesList);
//           component.setState({dataSource: newList});
//         })
//         .catch((error) => {
//             console.warn(error);
//         });
//     });
//   }
//
//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }
//
//   _onPressButton(){
//     console.log(navigator);
//     this.props.navigator.push({
//       component: MapViewExample,
//     })
//     console.log('pressed button');
//   }
//
//   fetchData() {
//     return fetch(REQUEST + this.state.lastPosition.coords.latitude + ',' + this.state.lastPosition.coords.longitude + query);
//   }
//
//   renderListItem(listItem){
//     return (
//       <TouchableHighlight style={styles.row} onPress={this._onPressButton} underlayColor='blue'>
//         <View>
//           <Text style={styles.title}>{listItem.name}</Text>
//           <Text>Distance: {listItem.location.distance} meters</Text>
//         </View>
//       </TouchableHighlight>
//     );
//   }
//
//   renderHeader() {
//     return(
//       <View>
//         <Text>
//           <Text style={styles.title}>Initial position: </Text>
//           {JSON.stringify(this.state.initialPosition.coords)}
//         </Text>
//         <Text>
//           <Text style={styles.title}>Current position: </Text>
//           {JSON.stringify(this.state.lastPosition.coords)}
//         </Text>
//       </View>
//     )
//   }
//
//   render() {
//     return (
//         <ListView
//           style={styles.container}
//           dataSource={this.state.dataSource}
//           renderRow={this.renderListItem}
//           renderHeader={this.renderHeader}
//         />
//   )}
// }
//
// class PropertyFinderApp extends React.Component {
//   render() {
//     return (
//       <React.NavigatorIOS
//         style={styles.container}
//         initialRoute={{
//           title: 'Property Finder',
//           component: HelloWorld,
//         }}/>
//     );
//   }
// }
//
// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column'
//   },
//   row: {
//     borderWidth: 1,
//     paddingLeft: 5,
//     marginTop: 1,
//   },
//   title: {
//     fontSize: 15
//   }
// });
//
// AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
