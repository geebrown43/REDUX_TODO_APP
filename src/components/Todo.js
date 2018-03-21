import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import reducers from "../reducers/reducer";
import logger from 'redux-logger'
import { createStore, applyMiddleware } from "redux";
import {SHOW_LINE, HIDE_LINE, ADD_ITEM} from '../actions/types'

let store = createStore(reducers, applyMiddleware(logger))
const { width, height } = Dimensions.get("window");

export default class Todo extends React.Component {
  state = {
    value: "",
    data: null,
  };

  _addTodo = e => {
    let text = this.state.value;
    store.dispatch(ADD_ITEM(text));
    this.setState({ data: store.getState(), value: "" });
    this.textInput.clear();
  };

  _markComplete = i => {
    store.dispatch(SHOW_LINE(i));
    this.setState({data: store.getState()})
  };

  render() {
    let data = this.state.data;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.brand}>To-Do List</Text>
        </View>
        <View style={styles.placement}>
          <TextInput
            ref={input => (this.textInput = input)}
            style={styles.input}
            onChangeText={value => this.setState({ value })}
            value={this.state.value}
          />
        </View>
        <TouchableOpacity onPress={this._addTodo}>
          <View style={styles.button}>
            <Text>+ Add</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.column}>
          {data !== null
            ? data.map((a, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => this._markComplete(i)}
                  >
                    <View>
                      <Text style={{textDecorationLine: data[i].style}}>{`\u2022 ${a.text}`}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  brand: {
    fontSize: 36
  },
  placement: {
    margin: 10
  },
  input: {
    borderWidth: 2,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    height: height / 18,
    width: width / 2,
    fontSize: 26
  },
  button: {
    borderWidth: 1
  },
  column: {
    flexDirection: "column",
    margin: 5
  },
});
