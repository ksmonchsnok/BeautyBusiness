import React, { Component } from "react";
import firebase from "firebase";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Circle,
  Polygon,
  Polyline
} from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      position: [],
      coords: {},
      geolocation: {},
      data: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    this.locations = this.props.locations;
  }

  componentDidMount() {
    let ref = firebase.database().ref("Store");
    let locations = [];
    ref.once("value").then(snapshot => {
      const data = snapshot.val();
      data.map(location =>
        locations.push({
          Name: location.Name,
          Lat: location.Lat,
          Lng: location.Lng
        })
      );
      this.setState({ locations });
    });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render_Mark_Partner = () => {
    const locations = this.state.locations;
    return locations.map(location => (
      <Marker
        onClick={this.onMarkerClick}
        title={location.Name}
        name={location.Name}
        position={{ Lat: location.Lat, Lng: location.Lng }}
      />
    ));
  };

  render_Mark_Curent = () => {
    let iconmark = "https://img.icons8.com/cotton/64/000000/place-marker.png";
    const current = this.state.coords;
    console.log(current, "Mark Current Now!");
    return (
      <Marker
        onClick={this.onMarkerClick}
        name={"Curent Now !!"}
        title={"Curent Now !!"}
        icon={iconmark}
        position={{
          Lat: current.Lat,
          Lng: current.Lng
        }}
      />
    );
  };

  get_current_Location = () => {
    const geolocation = navigator.geolocation;
    return geolocation.getCurrentPosition(position => {
      let get = [];
      this.setState({
        coords: {
          Lat: position.coords.Latitude,
          Lng: position.coords.Longitude
        }
      });
      get.push({
        Lat: position.coords.Latitude,
        Lng: position.coords.Longitude
      });
    });
  };

  get_Circle = () => {
    const circle = new window.google.maps.Circle({
      center: this.state.coords,
      radius: 10000,
      map: MapContainer,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35
    });
  };

  render() {
    const styles = {
      maxWidth: "100%",
      maxHeight: "100%",
      paddingTop: "20rem ",
      paddingBottom: "15rem ",
      marginTop: "-15rem",
      border: "solid 1px Gainsboro",
      borderRadius: "6px",
      boxShadow: "2px 2px 2px silver",
      display: "inline-flex"
    };

    return (
      <div id="maps">
        <h2 className="text-center font">ธุรกิจใกล้เคียง</h2>
        <div
          class="jumbotron justify-content-center "
          style={{ backgroundColor: "#ffffff" }}
        >
          <div
            className="container"
            style={{
              paddingTop: 5 + " rem",
              paddingBottom: 5 + " rem",
              marginTop: 15 + "rem",
              marginBottom: 20 + "rem",
              display: "block"
            }}
          >
            <div className="row col-sm">
              <Map
                center={this.state.coords}
                google={window.google}
                zoom={16}
                style={styles}
                onClick={this.onMapClicked}
              >
                {this.get_Circle()}
                {this.get_current_Location()}
                {this.render_Mark_Partner()}
                {this.render_Mark_Curent()}

                {/* <Circle
                  center={this.state.coords}
                  radius={10000}
                  strokeColor={"#FF0000"}
                  strokeOpacity={0.8}
                  strokeWeight={2}
                  fillColor={"#FF0000"}
                  fillOpacity={0.35}
                /> */}

                {/* <Circle
                  center={this.state.coords}
                  radius={10000}
                  ref={circle => {
                    this.circle = circle;
                  }}
                  options={{
                    fillColor: "#f00",
                    strokeColor: "#f00"
                  }}
                /> */}

                {/* <Polygon
                  paths={this.state.coords}
                  strokeColor={"#FF0000"}
                  strokeOpacity={0.8}
                  strokeWeight={2}
                  fillColor={"#FF0000"}
                  fillOpacity={0.35}
                />
 */}
                <Polyline
                  paths={this.state.coords}
                  strokeColor="#FF0000"
                  strokeOpacity={0.8}
                  strokeWeight={2}
                />

                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                >
                  <h5> {this.state.selectedPlace.name}</h5>
                </InfoWindow>
              </Map>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyDdoBV1pjIyFVBXHdo7wje7WdLcnY0HpFw"
})(MapContainer);
