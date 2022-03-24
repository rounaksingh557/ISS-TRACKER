// Modules Import
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require("../assets/bg.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>ISS-Tracker App</Text>
          </View>
          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => this.props.navigation.navigate("IssLocation")}
          >
            <Text style={styles.routeText}>ISS Location</Text>
            <Text style={styles.knowMore}>{"Know More --->"}</Text>
            <Text style={styles.backgroundDigit}>1</Text>
            <Image
              source={require("../assets/iss_icon.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => this.props.navigation.navigate("Meteors")}
          >
            <Text style={styles.routeText}>Meteors</Text>
            <Text style={styles.knowMore}>{"Know More --->"}</Text>
            <Text style={styles.backgroundDigit}>2</Text>
            <Image
              source={require("../assets/meteor_icon.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  routeCard: {
    flex: 0.25,
    borderRadius: 30,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    backgroundColor: "#fff",
  },
  routeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 30,
    marginTop: 75,
  },
  iconImage: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    position: "absolute",
    right: 20,
    top: -80,
  },
  knowMore: {
    paddingLeft: 30,
    color: "red",
    fontSize: 15,
  },
  backgroundDigit: {
    color: "rgba(3,2,6,0.5)",
    fontSize: 120,
    bottom: -15,
    right: 10,
    zIndex: -1,
    position: "absolute",
  },
});
