'use strict'

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  Text,
  Component
} = React;

class MapViewExample extends Component {
  getInitialState() {
    return {
      mapRegion: null,
      mapRegionInput: null,
      annotations: null,
      isFirstLoad: true,
    };
  }

  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion || undefined}
          annotations={this.state.annotations || undefined}
        />
        <MapRegionInput
          onChange={this._onRegionInputChanged}
          region={this.state.mapRegionInput || undefined}
        />
      </View>
    );
  }

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
    }];
  }

  _onRegionChange(region) {
    this.setState({
      mapRegionInput: region,
    });
  }

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        annotations: this._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  }

  _onRegionInputChanged(region) {
    this.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: this._getAnnotations(region),
    });
  }

};

module.export = MapViewExample;
