import React, { Component } from "react";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { GoogleApiWrapper } from "google-maps-react";
import { geolocated } from "react-geolocated";

class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      loadingData: false,
      data: [],
      coords: false,
    };

    if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
      this.currentOfLocation();
    } else {
      alert("Location is not available.");
    }
  }

  currentOfLocation = () => {
    const geolocation = navigator.geolocation;
    return geolocation.getCurrentPosition((position) => {
      {
        this.setState({
          coords: {
            Lat: (position.coords.latitude + 0.000175).toFixed(6),
            Lng: (position.coords.longitude + 0.000195).toFixed(6),
          },
        });
      }

      console.log(this.state.coords);
    });
  };

  render() {
    let position = this.state.coords;
    localStorage.setItem("Position", JSON.stringify(position));

    return <div id="nearby"></div>;
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

const enhance = compose(connect(mapStateToProps), googleApiWrapper, geo);
export default enhance(Position);
