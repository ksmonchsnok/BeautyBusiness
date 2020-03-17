import React, { Component } from "react";
import firebase from "firebase";
import "../../style.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import Maps from "../../service/google-maps/maps.js";
import Navber from "../../components/navbar/navbar.js";

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataitem: [],
      locations: [],
      dataarray: [],
      coords: false
    };
    this.state.our_position = this.get_current_Location();
  }

  goto_Detail = value => {
    this.props.history.push({
      pathname: "/Store",
      state: [value]
    });
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

  get_calulated_nearby = () => {
    const result = [];
    const partner = this.state.locations;
    const our_position = this.state.coords;
    partner.map((el, i) => {
      let dataarray = this.state.dataarray;
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
        dataarray.push({
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
    this.get_calulated_nearby();
    let rootRef = firebase.database().ref("Store");

    const item = this.state.dataarray.map(value => (
      <div className="col-lg-3 col-md-6">
        <div key={value.ID}>
          <a href="" onClick={() => this.goto_Detail(value)}>
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
        <Maps />

        <div className="container">
          <h2 className="text-center font" style={{ lineHeight: "2.5rem" }}>
            ธุรกิจใกล้เคียงในระยะ 1 กิโลเมตร
          </h2>
          <div className="album  bg-while pad ">
            <div className="row">{item}</div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ firebase }) {
  return {
    Store: firebase.ordered.Store
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/Store" }]),
  connect(mapStateToProps)
);

export default enhance(Nearby);
