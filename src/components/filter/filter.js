import React, { Component } from "react";
import "../../style.css";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: []
    };
  }

  componentWillMount = () => {
    // console.log(this.props.rating, "ratting");
  };

  render() {
    return (
      <div id="Filter">
        <div className="col pad">
          {/* <ul class="list-group list-group-flush text-left">
            <h5>ส่วนลดบริการ</h5>
            <ul>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value={this.props.discount}
                  onChange={e => this.onCheckDiscount(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio1">
                  มี
                </label>
                &emsp;
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value={this.props.discount}
                  onChange={e => this.onCheckDiscount(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio2">
                  ไม่มี
                </label>
              </div>
            </ul>
            <h5 style={{ marginTop: "1rem" }}>โปรโมชั่น</h5>
            <ul>
              {" "}
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value={this.props.promotion}
                  onChange={e => this.props.onCheckPromotion(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio1">
                  มี
                </label>
                &emsp;
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value={this.props.promotion}
                  onChange={e => this.props.onCheckPromotion(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio2">
                  ไม่มี
                </label>
              </div>
            </ul>
            <hr />
          </ul> */}
        </div>

        <div
          className="col"
          onChange={e => this.props.onCheckType(e.target.value)}
        >
          <ul class="list-group list-group-flush text-left">
            <h5 className="">ประเภทธุรกิจ</h5>
            <li class="list-group-item">
              {" "}
              <input
                type="checkbox"
                value="ตัดผมชาย"
                defaultChecked={this.state.checked}
              />{" "}
              ตัดผมชาย
            </li>
            <li class="list-group-item">
              {" "}
              <input
                type="checkbox"
                value="เสริมสวย"
                defaultChecked={this.state.checked}
              />{" "}
              เสริมสวย
            </li>
            <li class="list-group-item">
              {" "}
              <input
                type="checkbox"
                value="ทำเล็บ"
                defaultChecked={this.state.checked}
              />{" "}
              ทำเล็บ
            </li>
            <li class="list-group-item">
              <input
                type="checkbox"
                value="ต่อขนตา"
                defaultChecked={this.state.checked}
              />{" "}
              ต่อขนตา
            </li>
            <li class="list-group-item">
              {" "}
              <input
                type="checkbox"
                value="สักคิ้ว"
                defaultChecked={this.state.checked}
              />{" "}
              สักคิ้ว
            </li>

            <li class="list-group-item">
              {" "}
              <input
                type="checkbox"
                value="แว็กซ์ขน"
                defaultChecked={this.state.checked}
              />{" "}
              แว็กซ์ขน
            </li>
            <li class="list-group-item">
              {" "}
              <input
                type="checkbox"
                value="สปา"
                defaultChecked={this.state.checked}
              />{" "}
              สปา
            </li>
            <li class="list-group-item">
              {" "}
              <input
                type="checkbox"
                value="Tattoo"
                defaultChecked={this.state.checked}
              />{" "}
              Tattoo
            </li>
            <hr />
          </ul>
        </div>
      </div>
    );
  }
}
