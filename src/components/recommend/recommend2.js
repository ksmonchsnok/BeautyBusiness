import React, { Component } from "react";
import "../../style.css";
import firebase from "firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { NavLink } from "react-router-dom";

class Recommen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
  }

  componentWillMount = () => {
    console.log(this.props);
  };

  render() {
    let category = [];
    let rootRef = firebase.database().ref("categories");
    let Ref = rootRef
      .orderByChild("recommen")
      .equalTo(true)
      .on("child_added", snapshot => {
        category.push(snapshot.val());
      });

    const item = category.map(value => (
      <div className="col-lg-3 col-md-6">
        <div key={value.id}>
          <a href="" onClick={() => this.props.goto_Detail(value)}>
            <img
              className="card-img-top img-fluid rounded mx-auto d-block"
              src={value.image}
              alt="image"
            />
            <div className="card-body text-left mb-auto">
              <h6 className="styleFont">
                <p className="font">{value.name}</p>
                <hr />
                {value.type.map(el => (
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
              </h6>
            </div>
          </a>
        </div>
      </div>
    ));
    return (
      <div id="recommen">
        <div className="container">
          <h2
            className="text-left font row"
            style={{ marginBottom: -2 + "rem" }}
          >
            {" "}
            แนะนำ
          </h2>
        </div>
        <NavLink
          exact
          to="/listall"
          activeClassName="is-active"
          className="nav-link link-menu text-right "
        >
          <h6> ดูทั้งหมด >></h6>
        </NavLink>

        <div className="row" style={{ marginTop: -1.5 + "rem" }}>
          {item}
        </div>

        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={pic} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={pic} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={pic} className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

      </div>
    );
  }
}
function mapStateToProps({ firebase }) {
  return {
    categories: firebase.ordered.categories
  };
}

const enhance = compose(
  firebaseConnect([{ path: "/categories" }]),
  connect(mapStateToProps)
);

export default enhance(Recommen);