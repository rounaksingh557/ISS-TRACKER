// Modules Import
import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
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

  renderItem = ({ item }) => {
    let meteor = item;
    let BackGroundImage, speed, size;
    if (meteor.threat_score <= 30) {
      BackGroundImage = require("../assets/meteor-a.png");
      speed = require("../assets/Speed-01.gif");
      size = 100;
    } else if (meteor.threat_score <= 75) {
      BackGroundImage = require("../assets/meteor-b.png");
      speed = require("../assets/speed-02.gif");
      size = 150;
    } else {
      BackGroundImage = require("../assets/meteor-c.png");
      speed = require("../assets/speed-03.gif");
      size = 200;
    }

    return (
      <View>
        <ImageBackground
          source={BackGroundImage}
          style={styles.backgroundImage}
        >
          <View style={styles.gifContainer}>
            <Image
              source={speed}
              style={{ width: size, height: size, alignSelf: "center" }}
            />
            <View style={styles.meteorInfo}>
              <Text style={[styles.meteorName, { marginTop: 350 }]}>
                {item.name}
              </Text>
              <Text style={[styles.meteorText, { marginTop: 20 }]}>
                closest to earth -
                {item.close_approach_data[0].close_approach_date_full}
              </Text>
              <Text style={styles.meteorText}>
                Minimum Diameter(KM) -{" "}
                {item.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
              <Text style={styles.meteorText}>
                Maximum Diameter(KM) -{" "}
                {item.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
              <Text style={styles.meteorText}>
                Velocity(KM/h) -{" "}
                {
                  item.close_approach_data[0].relative_velocity
                    .kilometers_per_hour
                }
              </Text>
              <Text style={styles.meteorText}>
                Miss Distance(KM) -
                {item.close_approach_data[0].miss_distance.kilometers}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
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
          1000000000;
        element.threat_score = threatScore;
      });

      meteor.sort(function (a, b) {
        return b.threat_score - a.threat_score;
      });

      meteor = meteor.slice(0, 5);

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidsafeArea} />
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={meteor}
            renderItem={this.renderItem}
            horizontal={true}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidsafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  gifContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  meteorName: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
  },
  meteorText: {
    fontSize: 17,
    color: "white",
    top: 3,
  },
});
