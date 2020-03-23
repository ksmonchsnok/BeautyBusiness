import React, { Component } from "react";
import firebase from "firebase";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Navber from "../../components/navbar/navbar.js";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { geolocated } from "react-geolocated";

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataitem: [],
      locations: [],
      data: [],
      coords: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    // this.locations = this.props.locations;

    if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
      this.currentOfLocation();
    } else {
      alert("Location is not available");
    }
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
          Lng: location.Lng,
          ID: location.ID,
          Image: location.Image,
          Star: location.Star,
          Ref: location.Ref,
          Address: location.Address,
          Type: location.Type,
          Open: location.Open,
          Phone: location.Phone
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

  // markStore = () => {
  //   const locations = this.state.locations;
  //   return locations.map(location => (
  //     <Marker
  //       onClick={this.onMarkerClick}
  //       title={location.Name}
  //       name={location.Name}
  //       position={{ Lat: location.Lat, Lng: location.Lng }}
  //     />
  //   ));
  // };

  //markCurent = () => {
  //   let iconmark = "https://img.icons8.com/cotton/64/000000/place-marker.png";
  //   const current = this.state.coords;
  //   console.log(current, "Mark Current Now!");
  //   return (
  //     <Marker
  //       onClick={this.onMarkerClick}
  //       name={"Curent Now !!"}
  //       title={"Curent Now !!"}
  //       icon={iconmark}
  //       position={{
  //         Lat: current.Lat,
  //         Lng: current.Lng
  //       }}
  //     />
  //   );
  // };

  handleToggle = () => {
    this.setState({
      isOpen: !false
    });
  };
  currentOfLocation = () => {
    const geolocation = navigator.geolocation;
    return geolocation.getCurrentPosition(position => {
      this.setState({
        coords: {
          Lat: position.coords.latitude,
          Lng: position.coords.longitude
        }
      });

      console.log(position);
    });
  };

  onClickViewDetail = value => {
    this.props.history.push({
      pathname: "/Store",
      state: [value]
    });
  };

  calulatedNearby = () => {
    const result = [];
    const store = this.state.locations;
    const our_position = this.state.coords;
    let data = this.state.data;
    store.map((el, i) => {
      let Lat1 = our_position.Lat;
      let Lng1 = our_position.Lng;
      let Lat2 = el.Lat;
      let Lng2 = el.Lng;
      let Name = el.Name;

      let R = 6371;
      let dLat = ((Lat2 - Lat1) * Math.PI) / 180;
      let dLng = ((Lng2 - Lng1) * Math.PI) / 180;

      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((Lat1 * Math.PI) / 180) *
          Math.cos((Lat2 * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      let m = d / 0.001;

      result.push(Name + " ==> " + m.toFixed(0));
      if (d < 1) {
        data.push({
          Name: el.Name,
          Lat: el.Lat,
          Lng: el.Lng,
          ID: el.ID,
          Image: el.Image,
          Star: el.Star,
          Ref: el.Ref,
          Address: el.Address,
          Type: el.Type,
          Open: el.Open,
          Phone: el.Phone,
          m: parseInt(m)
        });
      }
    });
  };

  render() {
    this.calulatedNearby();
    const styles = {
      maxWidth: "100%",
      maxHeight: "100%",
      paddingTop: "20rem ",
      paddingBottom: "15rem ",
      marginRight: "2rem",
      border: "solid 1px Gainsboro",
      borderRadius: "8px",
      boxShadow: "2px 2px 2px silver",
      display: "inline-flex",
      position: "absolute"
    };

    const item = this.state.data.map(value => (
      <div className="col-lg-3 col-md-6">
        <div key={value.ID}>
          <a href="" onClick={() => this.onClickViewDetail(value)}>
            <img
              className="card-img-top img-fluid rounded mx-auto d-block"
              src={value.Image}
              alt="image"
            />
            <div className="card-body text-left mb-auto">
              <h6 className="styleFont">
                <p className="font">{value.Name}</p>

                <hr />
                <p style={{ textAlign: "left", color: "#000" }}>{value.m} ม.</p>

                {value.Type.map(el => (
                  <p
                    style={{
                      marginLeft: -2,
                      marginRight: 8,
                      marginBottom: 3,
                      marginTop: 0.5,
                      fontWeight: "lighter",
                      fontSize: 14 + "px"
                    }}
                    className="badge badge-secondary"
                  >
                    {el}
                  </p>
                ))}
                <p style={{ lineHeight: 1 + "rem", color: "#000" }}>
                  {value.Address}
                </p>
              </h6>
            </div>
          </a>
        </div>
      </div>
    ));

    return (
      <div id="nearby">
        <Navber />

        <div className="" style={{ height: "80vh", width: "100%" }}>
          <h2 className="text-center">แผนที่แสดงธุรกิจทั้งหมด</h2>

          <div
            className="jumbotron justify-content-center d-flex justify-content-center"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="col-11">
              {this.state.coords.Lat && this.state.coords.Lng && (
                <Map
                  google={this.props.google}
                  zoom={12}
                  style={styles}
                  initialCenter={{
                    lat: this.state.coords.Lat,
                    lng: this.state.coords.Lng
                  }}
                >
                  {this.state.data.map((l, i) => {
                    return (
                      <Marker
                        key={i}
                        title={l.Name}
                        name={l.Name}
                        position={{ lat: l.Lat, lng: l.Lng }}
                      >
                        <InfoWindow
                          key={"win_" + i}
                          visible={true}
                          onCloseClick={this.handleToggle}
                          position={{ lat: l.Lat, lng: l.Lng }}
                        >
                          <h4>{l.Name}</h4>
                        </InfoWindow>
                      </Marker>
                    );
                  })}

                  <Marker
                    key={"2"}
                    label={"You"}
                    title={"You"}
                    name={"You"}
                    position={{
                      lat: this.state.coords.Lat,
                      lng: this.state.coords.Lng
                    }}
                  >
                    <InfoWindow visible={true}>
                      <h5>You</h5>
                    </InfoWindow>
                  </Marker>
                </Map>
              )}
            </div>
          </div>
        </div>

        <h4 className="text-center font" style={{ lineHeight: "2.5rem" }}>
          ธุรกิจใกล้เคียงในระยะ 1 กิโลเมตร
        </h4>
        <div className="container">
          <div className="album bg-while pad">
            <hr style={{ marginTop: "1rem" }} />

            <div className="row">{item}</div>
          </div>
        </div>
      </div>
    );
  }
}

const googleApiWrapper = GoogleApiWrapper({
  apiKey: "AIzaSyDdoBV1pjIyFVBXHdo7wje7WdLcnY0HpFw"
});

function mapStateToProps({ firebase }) {
  return {
    Store: firebase.ordered.Store
  };
}

const geo = geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
});

const enhance = compose(
  firebaseConnect([{ path: "/Store" }]),
  connect(mapStateToProps),
  googleApiWrapper,
  geo
);
export default enhance(Nearby);
