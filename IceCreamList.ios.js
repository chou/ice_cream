var React = require('react-native');
var IceCreamListItem = require('./IceCreamListItem.ios')

var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  } = React;

var styles = StyleSheet.create({
  title: {
    fontSize: 15
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

var IceCreamList = React.createClass({
  renderHeader: function () {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {JSON.stringify(this.props.initialPosition.coords)}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {JSON.stringify(this.props.lastPosition.coords)}
        </Text>
      </View>
    )
  },

  renderIceCreamListItem: function (iceCreamParlor) {
    return (
      <IceCreamListItem
        location={iceCreamParlor.location}
        name={iceCreamParlor.name}
        >
      </IceCreamListItem>)

  },

  render: function () {
    return (
      <ListView
        style={styles.container}
        dataSource={this.props.dataSource}
        renderRow={this.renderIceCreamListItem}
        renderHeader={this.renderHeader}
        ></ListView>
    )
  }
});

module.exports = IceCreamList;