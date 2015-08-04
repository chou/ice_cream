var React = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  } = React;


var styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 1,
  },
  title: {
    fontSize: 15
  }
});

var IceCreamListItem = React.createClass({
  render: function () {
    return (
      <View style={styles.row}>
        <TouchableHighlight>
          <View>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text>Distance: {this.props.location.distance} meters</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

module.exports = IceCreamListItem;