const express = require("express");
const app = express();
const axios = require('axios')

exports.getAadhardetail = (req, res) => {
  
    // app.get("/promise", (req, res) => {
    //     axios({
    //         url: "users",
    //         method: "get",
    //     }).then(response => {
    //         res.status(200).json(response.data);
    //     }).catch((err) => {
    //         res.status(500).json({ message: err });
    //     });
    // }); 

    // const delete_status = req.query.delete_status;
    // var condition = delete_status? { delete_status: 0 } : {};

    console.log('req', req.query);

    // const config = {
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //     },
    // };     
    
    // const response = axios.post("http://127.0.0.1:5009", {
    //     title: "test",
    //     body: "test",
    //     userID: 1
    // }, config);
    // res.status(200).json(response);

    // try {

    // } catch (err) {
    //     res.status(500).json({ message: err });
    // }
    

};
   