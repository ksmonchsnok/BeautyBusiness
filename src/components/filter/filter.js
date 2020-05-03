import React, { Component } from "react";
import "../../style.css";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      discount: true,
      promotion: true,
    };
  }

  checkDiscount = (e) => {
    let checkDis = document.getElementById("discount1").checked;
    this.setState({ discount: checkDis });
    this.props.onCheckDiscount(checkDis);
  };
  checkPromotion = () => {
    let checkPro = document.getElementById("Promotion1").checked;
    this.setState({ promotion: checkPro });
    this.props.onCheckPromotion(checkPro);
  };

  render() {
    // console.log(this.props);
    
    return (
      <div id="Filter">
        <div className="col pad">
        <hr style={{ borderTop: "1px solid #F69220 !important"}}></hr>

          <ul class="list-group list-group-flush text-left">
            <h5>ส่วนลดบริการ</h5>
            <ul>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="discont"
                  id="discount1"
                  checked={this.state.discount}
                  value={this.state.discount}
                  onChange={(e) => this.checkDiscount(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio1">
                  มี
                </label>
                &emsp;
                <input
                  class="form-check-input"
                  type="radio"
                  name="discont"
                  id="discount2"
                  checked={!this.state.discount}
                  value={this.state.discount}
                  onChange={(e) => this.checkDiscount(e.target.value)}
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
                  name="promotion"
                  id="Promotion1"
                  checked={this.state.promotion}
                  value={this.state.promotion}
                  onChange={(e) => this.checkPromotion(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio1">
                  มี
                </label>
                &emsp;
                <input
                  class="form-check-input"
                  type="radio"
                  name="promotion"
                  id="Promotion2"
                  checked={!this.state.promotion}
                  value={this.state.promotion}
                  onChange={(e) => this.checkPromotion(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio2">
                  ไม่มี
                </label>
              </div>
            </ul>
            <hr />
          </ul>
        </div>
        <div
          className="col" id="filterType"
          onChange={(e) => this.props.onCheckType(e.target.value)}
        >
          <hr style={{ borderTop: "1px solid #F69220 !important"}}></hr>
          <h5 className="text-left">ประเภทธุรกิจ</h5>

          <ul class="list-group list-group-flush text-left filter-Business">
            <li class="list-item">
              {" "}
              <input
                type="checkbox"
                value="ตัดผมชาย"
                defaultChecked={this.state.checked}
              />{" "}
              ตัดผมชาย
            </li>
            <li class="list-item">
              {" "}
              <input
                type="checkbox"
                value="เสริมสวย"
                defaultChecked={this.state.checked}
              />{" "}
              เสริมสวย
            </li>
            <li class="list-item">
              {" "}
              <input
                type="checkbox"
                value="ทำเล็บ"
                defaultChecked={this.state.checked}
              />{" "}
              ทำเล็บ
            </li>
            <li class="list-item">
              <input
                type="checkbox"
                value="ต่อขนตา"
                defaultChecked={this.state.checked}
              />{" "}
              ต่อขนตา
            </li>
            <li class="list-item">
              {" "}
              <input
                type="checkbox"
                value="สักคิ้ว"
                defaultChecked={this.state.checked}
              />{" "}
              สักคิ้ว
            </li>

            <li class="list-item">
              {" "}
              <input
                type="checkbox"
                value="แว็กซ์ขน"
                defaultChecked={this.state.checked}
              />{" "}
              แว็กซ์ขน
            </li>
            <li class="list-item">
              {" "}
              <input
                type="checkbox"
                value="สปา"
                defaultChecked={this.state.checked}
              />{" "}
              สปา
            </li>
            <li class="list-item">
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
