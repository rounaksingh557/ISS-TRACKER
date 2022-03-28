// Modules Import
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Platform,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";

export default class IssLocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.getIssLocation();
  }

  getIssLocation() {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        this.setState({ location: response.data });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground
            source={require("../assets/iss_bg.jpg")}
            style={styles.backGroundImage}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>ISS Location</Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}
                >
                  <Image
                    source={require("../assets/iss_icon.png")}
                    style={{ height: 50, width: 50 }}
                  />
                </Marker>
              </MapView>
            </View>
            <View style={styles.informationContainer}>
              <Text style={styles.informationText}>
                Latitude: {this.state.location.latitude}
              </Text>
              <Text style={styles.informationText}>
                Longitude: {this.state.location.longitude}
              </Text>
              <Text style={styles.informationText}>
                Altitude (Km) : {this.state.location.altitude}
              </Text>
              <Text style={styles.informationText}>
                Velocity (Km/h) : {this.state.location.velocity}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backGroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  titleContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  mapContainer: {
    flex: 0.6,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  informationContainer: {
    flex: 0.3,
    backgroundColor: "black",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 0,
    padding: 20,
  },
  informationText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
  },
});
