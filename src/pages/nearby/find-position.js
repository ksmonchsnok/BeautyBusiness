import React, { Component } from "react";
import firebase from "firebase";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { GoogleApiWrapper } from "google-maps-react";
import { geolocated } from "react-geolocated";

class FindPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataitem: [],
      locations: [],
      loadingData: false,
      data: [],
      coords: JSON.parse(localStorage.getItem("Position")),
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
      this.currentOfLocation();
    } else {
      alert("Location is not available.");
    }
  }

  componentDidMount() {
    this.setState({ loadingData: true });

    let ref = firebase.database().ref("Store");

    let locations = [];

    ref.once("value").then((snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val());
        data.map((location) =>
          locations.push({
            Name: location.Name,
            Lat: location.Lat,
            Lng: location.Lng,
            ID: location.userOfStoreId,
            imageUrl: location.imageUrl,
            Social: location.Social,
            Address: location.Address,
            Type: location.Type,
            Open: location.Open,
            Phone: location.Phone,
          })
        );
        if (typeof data === "object" && data !== null && data !== undefined) {
          let arr = [];
          var key = Object.keys(data);
          let arr1 = Object.values(data);
          for (let i = 0; i < arr1.length; i++) {
            arr[key[i]] = arr1[i];
          }
          // this.setState({ data: arr });
        } else {
          this.setState({ data });
        }
        this.setState({ loadingData: false });
      } else {
        this.setState({ loadingData: false });
      }

      this.setState({ locations });
    });
    this.setState({ loadingData: false });
  }

  // currentOfLocation = () => {
  //   const geolocation = navigator.geolocation;
  //   return geolocation.getCurrentPosition((position) => {
  //     {
  //       this.setState({
  //         coords: {
  //           Lat: (position.coords.latitude + 0.000175).toFixed(6),
  //           Lng: (position.coords.longitude + 0.000195).toFixed(6),
  //         },
  //       });
  //     }
  //     console.log(this.state.coords);
  //   });
  // };

  currentOfLocation = () => {
    let position = JSON.parse(localStorage.getItem("Position"));

    this.setState({
      coords: position,
    });
    // console.log(this.state.coords);
  };

  onClickViewDetail = (value) => {
    this.props.history.push({
      pathname: "/StoreDetail",
      state: [value],
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
          ID: el.userOfStoreId,
          imageUrl: el.imageUrl,
          Social: el.Social,
          Address: el.Address,
          Type: el.Type,
          Open: el.Open,
          Phone: el.Phone,
          m: parseInt(m),
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
      paddingBottom: "10rem ",
      marginRight: "3rem",
      border: "solid 1px Gainsboro",
      borderRadius: "8px",
      boxShadow: "2px 2px 2px silver",
      display: "inline-flex",
      position: "absolute",
    };

    const item = this.state.data.map((value) => (
      <div className="col-lg-3 col-md-6">
        <div key={value.userOfStoreId}>
          <a href onClick={() => this.onClickViewDetail(value)}>
            <img
              className="card-img-top img-fluid rounded mx-auto d-block"
              src={value.imageUrl}
              alt="image"
              aria-hidden="true"
            />
            <div className="card-body text-left mb-auto">
              <h6 className="styleFont">
                <p className="font">{value.Name}</p>

                <hr />
                <p style={{ textAlign: "left", color: "#000" }}>{value.m} ม.</p>

                {value.Type.map((el) => (
                  <p
                    style={{
                      marginLeft: -2,
                      marginRight: 8,
                      marginBottom: 5,
                      marginTop: 0.5,
                      fontWeight: "lighter",
                      fontSize: 14 + "px",
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

    const { loadingData } = this.state;

    return (
      <div id="nearby">
        <div className="container">
          <div className="album bg-while pad">
            <div
              className="container jumbotron jumbotron-fluid"
              style={{ backgroundColor: "transparent" }}
            >
              <h1
                className="col text-left font row"
                style={{ marginBottom: "-2rem" }}
              >
                ธุรกิจใกล้เคียงในระยะ 1 กิโลเมตร
              </h1>
            </div>

            {!loadingData && <div className="row">{item}</div>}
            {loadingData && (
              <div className="d-flex justify-content-center row col ">
                <span
                  className="spinner-border text-dark"
                  style={{
                    marginTop: "3rem",
                    marginBottom: "2rem",
                    width: "10rem",
                    height: "10rem",
                  }}
                  role="status"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const googleApiWrapper = GoogleApiWrapper({
  apiKey: "AIzaSyDdoBV1pjIyFVBXHdo7wje7WdLcnY0HpFw",
});

function mapStateToProps({ firebase }) {
  return {
    Store: firebase.ordered.Store,
  };
}

const geo = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
});

const enhance = compose(
  firebaseConnect([{ path: "/Store" }]),
  connect(mapStateToProps),
  googleApiWrapper,
  geo
);
export default enhance(FindPosition);
