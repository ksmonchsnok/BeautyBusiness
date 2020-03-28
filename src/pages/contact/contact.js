import React, { Component } from 'react';
import Navbar from "../../components/navbar/navbar.js"

export default class Contact extends Component {


    onclickBack=()=>{
        window.history.back()
    }    
    render() {
        return (
            <div id="Contact">
                <Navbar/>
                <div className="container"><h2 className="text-center" style={{marginTop:"-2rem"}}><br/>Contact Us</h2>
                <h6 className="text-center" >สนใจสินค้าและบริการ หรือ มีข้อสงสัย เราพร้อมให้คำปรึกษาโดยทีมงานมืออาชีพ</h6>
                {/* <hr style={{marginBottom:"1rem"}}/> */}
                <div className="row jumbotron" style={{background:"transparent"}}>
                    <div className="col-xs-12 col-md-6 col-lg-6">
                        
                        <h3><u>ติดต่อเรา</u></h3>
                        <ion-icon name="call"size="large" style={{marginRight:"1rem"}}/>085-521-0364 <br/>
                        <ion-icon name="mail" size="large" style={{marginRight:"1rem"}}/> <a href>ksmonchsnok@gmail.com</a> <br/>
                        <ion-icon name="logo-facebook" size="large" style={{marginRight:"1rem"}}/><a href="https://www.facebook.com/papadagon">Kp lyn</a> <br/>
                        <ion-icon name="logo-instagram" size="large"style={{marginRight:"1rem"}}/><a href="https://www.instagram.com/kplynx">Kplynx</a>

                        <h3 style={{marginTop:"2rem"}}><u>เวลาทำการ</u></h3>
                        <ion-icon name="time" size="large" style={{marginRight:"1rem"}}/>วันจันทร์ -วันศุกร์ <br/>
                        <p style={{textIndent: "3.5em"}}>เวลา 09.00 น. - 17.00 น.</p>

                     </div>

                  <div className="col-xs-12 col-md-6 col-lg-6" style={{border:"2px solid #000"}}>

                            <h3 className="text-center" style={{marginTop:"1rem"}}>
                                <u>กรอกข้อมูลผู้ติดต่อ</u></h3>
                                    <div className="row justify-content-center">
                                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5"> 
                                        <button type="button" type="submit" className="btn btn-success btn-block">ส่งข้อมูล</button>
                                        <button type="button" type="reset" className="btn btn-danger btn-block">ยกเลิก</button>
                            </div>
                            </div>
                            </div>  
                        </div>
                        <hr/>

                      <div className="row container">
                      <button type="button" onClick={this.onclickBack} className="btn btn-dark">ย้อนกลับ</button>
                      </div>
               
                </div>
            </div>
        );
    }
}

