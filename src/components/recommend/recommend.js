import React, { Component } from "react";
import pic from "../../assets/image/pic1.jpg";
export default class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loadingData: false,
    };
  }

  render() {
    return (
      <div id="Recommend">
        <div className="container marketing">
          <div className="row">
            <div className="col-lg-4">
              <img
                src={pic}
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                role="img"
                focusable="false"
              ></img>

              <h2>Heading</h2>
              <p>
                Donec sed odio dui. Etiam porta sem malesuada magna mollis
                euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna.
              </p>
              <p>
                <a className="btn btn-secondary" href="#" role="button">
                  View details »
                </a>
              </p>
            </div>
            <div className="col-lg-4">
              <img
                src={pic}
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                role="img"
                focusable="false"
              ></img>
              <h2>Heading</h2>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cras mattis consectetur purus
                sit amet fermentum. Fusce dapibus, tellus ac cursus commodo,
                tortor mauris condimentum nibh.
              </p>
              <p>
                <a className="btn btn-secondary" href="#" role="button">
                  View details »
                </a>
              </p>
            </div>
            <div className="col-lg-4">
              <img
                src={pic}
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                role="img"
                focusable="false"
              ></img>
              <h2>Heading</h2>
              <p>
                Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam. Vestibulum id ligula porta felis euismod
                semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
              <p>
                <a className="btn btn-secondary" href="#" role="button">
                  View details »
                </a>
              </p>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                First featurette heading.{" "}
                <span class="text-muted">It’ll blow your mind.</span>
              </h2>
              <p className="lead">
                Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                id ligula porta felis euismod semper. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                ac cursus commodo.
              </p>
            </div>
            <div className="col-md-5">
              <img
                src={pic}
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500"
                height="500"
                role="img"
                focusable="false"
              ></img>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading">
                Oh yeah, it’s that good.{" "}
                <span class="text-muted">See for yourself.</span>
              </h2>
              <p className="lead">
                Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                id ligula porta felis euismod semper. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                ac cursus commodo.
              </p>
            </div>
            <div className="col-md-5 order-md-1">
              <img
                src={pic}
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500"
                height="500"
                role="img"
                focusable="false"
              ></img>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                And lastly, this one. <span class="text-muted">Checkmate.</span>
              </h2>
              <p className="lead">
                Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                id ligula porta felis euismod semper. Praesent commodo cursus
                magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                ac cursus commodo.
              </p>
            </div>
            <div className="col-md-5">
              <img
                src={pic}
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                width="500"
                height="500"
                role="img"
                focusable="false"
              ></img>
            </div>
          </div>

          <hr className="featurette-divider" />
        </div>
      </div>
    );
  }
}
