import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  AppState,
  StyleSheet,
  ViewPropTypes as RNViewPropTypes,
} from "react-native";
import PanView from "./PanView";
import commonStyles from "../shared/styles.js";
import Cell from "./Cell";

const ViewPropTypes = RNViewPropTypes || View.propTypes;
const FIELD_BORDER_WIDTH = 6;
const textures = [
  {
    name: "field_assets",
    source: "field_assets",
  },
];

const assetsPerRow = 4;

export default class Minefield extends PureComponent {
  cellSize = 0;
  cellScaledSize = 0;
  fieldWidth = 0;
  fieldHeight = 0;
  unscaledFieldWidth = 0;
  unscaledFieldHeight = 0;
  cellDimensions = null;

  gl = null;
  texturesLoaded = false;
  program;
  uSampler;

  constructor(props) {
    super(props);
    this.onCellClick=this.onCellClick.bind(this)
    this.state = {
      appState: "active",
      gameFieldReady: false,
      viewWidth: 0,
      viewHeight: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ gameFieldReady: true }));
  }

  componentWillUnmount() {
    // this.unloadTextures();
    AppState.removeEventListener("change", this.onAppStateChanged);
  }

  handleLayoutChange = (event) => {
    this.setState({
      viewWidth: event.nativeEvent.layout.width,
      viewHeight: event.nativeEvent.layout.height,
    });
  };
 onCellClick(id){
    this.props.onCellClick(id)
 }
  renderBoard = () => {
    return Array.apply(null, Array(this.props.field.rows)).map((el, rowIdx) => {
      let cellList = Array.apply(null, Array(this.props.field.cols)).map(
        (el, colIdx) => {
          return (
            <Cell
              onReveal={this.onCellClick}
              onLongPress={this.props.onCellAltClick}
              key={colIdx}
              cols={this.props.field.cols}
              width={this.cellSize}
              height={this.cellSize}
              state={this.props.field.cells[rowIdx + ":" + colIdx]}
              x={colIdx}
              y={rowIdx}
            />
          );
        }
      );

      return (
        <View
          key={rowIdx}
          style={{
            width: this.fieldWidth,
            height: this.cellSize,
            flexDirection: "row",
          }}
        >
          {cellList}
        </View>
      );
    });
  };

  onAppStateChanged = (nextAppState) => {
    // when pausing unload textures to prevent black square/flickering problems after resume
    if (nextAppState !== "active") {
      // this.unloadTextures();
    }

    this.setState({ appState: nextAppState });
  };

  render() {
    if (this.state.viewWidth && this.state.viewHeight) {
      const rows = this.props.field.rows,
        cols = this.props.field.cols;

      this.cellSize = (this.state.viewWidth - FIELD_BORDER_WIDTH * 2) / cols;
      this.cellScaledSize = this.cellSize * this.props.zoomLevel;
      this.fieldWidth = this.cellScaledSize * cols;
      this.fieldHeight = this.cellScaledSize * rows;
      this.unscaledFieldWidth = this.cellSize * cols;
      this.unscaledFieldHeight = this.cellSize * rows;

      const fieldStyles = StyleSheet.create({
        scrollDimensions: {
          width: this.unscaledFieldWidth,
          height: this.unscaledFieldHeight,
        },
        fieldContainer: {
          width: this.fieldWidth,
          height: this.fieldHeight,
        },
        fieldDimensions: {
          width: this.unscaledFieldWidth * this.props.maxZoomLevel,
          height: this.unscaledFieldHeight * this.props.maxZoomLevel,
        },
      });

      return (
        <View
          style={[
            commonStyles.border,
            this.props.style,
            { opacity: this.state.gameFieldReady ? 1 : 0 },
          ]}
          onLayout={this.handleLayoutChange}
        >
          <PanView style={fieldStyles.scrollDimensions}>
            <View style={styles.container}>
              <View
                style={{
                  ...fieldStyles.fieldContainer,
                  backgroundColor: "#888888",
                }}
              >
                {this.state.gameFieldReady && this.renderBoard()}
              </View>
            </View>
          </PanView>
        </View>
      );
    } else {
      return (
        <View
          style={[commonStyles.border, this.props.style]}
          onLayout={this.handleLayoutChange}
        />
      );
    }
  }
}

Minefield.propTypes = {
  field: PropTypes.shape({
    rows: PropTypes.number,
    cols: PropTypes.number,
    cells: PropTypes.object,
  }),
  zoomLevel: PropTypes.number,
  maxZoomLevel: PropTypes.number,
  status: PropTypes.string,
  style: ViewPropTypes.style,
  onCellClick: PropTypes.func,
  onCellAltClick: PropTypes.func,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bdbdbd",
  },
});
