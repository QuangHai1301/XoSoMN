import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native';
export default class App extends Component {
   constructor(props) {
    super(props);
    this.state = {loteryResult: '', selectedProvince: 'AG', dateSelected: ''}
    let self = this
    fetch('http://thanhhungqb.tk:8080/kqxsmn')
      .then((response) => response.json())
      .then((responseJson) => {
        self.setState({loteryResult: responseJson});
        // console.warn(JSON.stringify(self.state.loteryResult['AG']))
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  _renderDatePicker() {
    var loteryResult = this.state.loteryResult[this.state.selectedProvince]
    let items = []
    for (var key in loteryResult) {
      if (loteryResult.hasOwnProperty(key)) {
        items.push(<Picker.Item label={key} value={key} key={key} />)
      }
    }
    return items
  }
  _renderResult() {
    if (this.state.dateSelected === '') return;    
    else {
      let results = []
      let resultOnDate = this.state.loteryResult[this.state.selectedProvince][this.state.dateSelected]
      for (var key in resultOnDate) {
        if (resultOnDate.hasOwnProperty(key)) {
          results.push(<Text key={key}>Giải {key}: {resultOnDate[key].toString()}</Text>)
        }
      }
      return results;
    } 
  }
  render() {
    return (
      <View style={styles.container}>
        <Picker 
          style={{width: 200}}
          selectedValue={this.state.selectedProvince}
          onValueChange={(province) => this.setState({selectedProvince: province, dateSelected: Object.keys(this.state.loteryResult[province])[0]})}>
          <Picker.Item label="An Giang" value="AG" />
          <Picker.Item label="Bình Dương" value="BD" />
          <Picker.Item label="Bạc Liêu" value="BL" />
          <Picker.Item label="Bình Phước" value="BP" />
          <Picker.Item label="Bình Thuận" value="BTH" />
          <Picker.Item label="Cà Mau" value="CM" />
          <Picker.Item label="Cần Thơ" value="CT" />
          <Picker.Item label="Hồ Chí Minh" value="HCM" />
        </Picker>
        <Picker style={{width: 200}}
        selectedValue={this.state.dateSelected}
        onValueChange={(date) => this.setState({dateSelected: date})}>
          {this._renderDatePicker()}
        </Picker>
        <View style={styles.instructions}>
          {this._renderResult()}
        </View>
      </View>
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
    marginBottom: 5,
  },
});