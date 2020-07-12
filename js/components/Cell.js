import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Images from "../assets/Images";
import Icon from "./Icon";
import flag from "../assets/flag.png";
export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.onReveal = this.onReveal.bind(this);
  }
  getBackgroundColor = () => {
    return !this.props.state.closed
      ? this.reverserOrderColorsRevealed()
      : this.reverserOrderColorsNotRevealed();
  };
  reverserOrderColorsNotRevealed = () => {
    return this.props.y % 2
      ? (parseInt(this.props.y.toString() + "0") + this.props.x) % 2 == 0
        ? "#96F251"
        : "#36ED2A"
      : (parseInt(this.props.y.toString() + "0") + this.props.x) % 2 == 0
      ? "#36ED2A"
      : "#96F251";
  };
  reverserOrderColorsRevealed = () => {
    return this.props.y % 2
      ? (parseInt(this.props.y.toString() + "0") + this.props.x) % 2 == 0
        ? "#AB9772"
        : "#CDBA93"
      : (parseInt(this.props.y.toString() + "0") + this.props.x) % 2 == 0
      ? "#CDBA93"
      : "#AB9772";
  };
  onReveal() {
    this.props.onReveal(this.props.state.id);
  }
  render() {
    if (this.props.state.closed) {
      return this.props.state.flagged ? (
        <View
          style={[
            styles.cell,
            {
              width: this.props.width,
              height: this.props.height,
              padding: 7,
              backgroundColor: this.getBackgroundColor(),
            },
          ]}
        >
          <Icon source={flag} externalSource={true} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={this.onReveal}
          onLongPress={() => this.props.onLongPress(this.props.state.id)}
          rejectResponderTermination
        >
          <View
            style={[
              styles.cell,
              {
                width: this.props.width,
                height: this.props.height,
                backgroundColor: this.getBackgroundColor(),
              },
            ]}
          ></View>
        </TouchableOpacity>
      );
    } else {
      let content = null;
      if (this.props.state.isMine) {
        content = (
          <Image
            source={Images.mine}
            style={{
              width: this.props.width / 2,
              height: this.props.height / 2,
            }}
            resizeMode="contain"
          />
        );
      } else if (this.props.state.minesAround) {
        content = <Text>{this.props.state.minesAround}</Text>;
      }

      return (
        <View
          style={[
            styles.cellRevealed,
            {
              width: this.props.width,
              height: this.props.height,
              backgroundColor: this.getBackgroundColor(),
            },
          ]}
        >
          {content}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 0,
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#7d7d7d",
    borderBottomColor: "#7d7d7d",
  },
  cellRevealed: {
    borderWidth: 0,
    borderColor: "#7d7d7d",
    alignItems: "center",
    justifyContent: "center",
  },
});
