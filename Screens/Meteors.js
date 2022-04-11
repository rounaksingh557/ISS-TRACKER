// Modules Import
import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import axios from "axios";

export default class MeteorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteors: {},
    };
  }

  componentDidMount() {
    this.getMeteors();
  }

  getMeteors = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?api_key=USfGOEnFobM2MA7IJbbxCDsOCfhAQlvXafFr2FJx"
      )
      .then((response) => {
        this.setState({ meteors: response.data.near_earth_objects });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    if (Object.keys(this.state.meteors).length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      );
    } else {
      let meteor_array = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });

      let meteor = [].concat.apply([], meteor_array);

      meteor.forEach(function (element) {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_max +
            element.estimated_diameter.kilometers.estimated_diameter_min) /
          2;
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          10000000;
      });

      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Meteor Screen!</Text>
        </View>
      );
    }
  }
}
