import React, { Component } from "react";
import firebase from "firebase";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { GoogleApiWrapper } from "google-maps-react";
import { geolocated } from "react-geolocated";

class Nearby extends Component {
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

  onclickBack = () => {
    window.history.back();
  };

  handleToggle = () => {
    this.setState({
      isOpen: !false,
    });
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
              <h5 className="styleFont">
                <h3 className="font">{value.Name}</h3>

                <h4 style={{ textAlign: "left", color: "#000" }}>
                  {value.m} ม.
                </h4>

                {value.Type.map((el) => (
                  <h5
                    style={{
                      marginLeft: -2,
                      marginRight: 8,
                      marginBottom: 5,
                      marginTop: 0.5,
                      fontWeight: "lighter",
                      fontSize: 18 + "px",
                    }}
                    className="badge badge-success"
                  >
                    {el}
                  </h5>
                ))}
                {/* <h6 style={{ lineHeight: 1 + "rem", color: "#000" }}>
                  {value.Address}
                </h6> */}
              </h5>
            </div>
          </a>
        </div>
      </div>
    ));

    return (
      <div id="nearby" style={{ marginTop: "2rem" }}>
        <div className="container">
          <div className="album bg-while pad">
            <h1 className="text-left">ธุรกิจใกล้เคียงในระยะ 1 กิโลเมตร</h1>
            <div class="animated bounceInLeft delay-2s">
              {" "}
              <div className="row">{item}</div>
            </div>
          </div>

          <hr />
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
export default enhance(Nearby);
