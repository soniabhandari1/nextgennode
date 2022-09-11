const express = require("express");
const connection = require("../connection");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/signup", (req, res) => {
  let user = req.body;

  let query = "select email,password,role,status from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        let query =
          "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
        connection.query(
          query,
          [user.name, user.contactNumber, user.email, user.password],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Successfully Registered" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Email Already Exist" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/login", (req, res) => {
  let user = req.body;
  let query = "select email,password,role,status from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0 || results[0].password != user.password) {
        return res
          .status(400)
          .json({ message: "Incorrect UserName or Password" });
      } else if (results[0].status == "false") {
        return res.status(401).json({ message: "Wait for Admin Approval" });
      } else if (results[0].password == user.password) {
        const response = {
          email: results[0].email,
          password: results[0].password,
        };
        const accesstoken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: "8h",
        });
        return res.status(200).json({ token: accesstoken });
      } else {
        return res.status(400).json({ message: "Something Went Wrong" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/forgotPassword", (req, res) => {
  let user = req.body;
  let query = "select email,password from user where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        res.status(200).json({ message: "No such user" });
      } else {
        var mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Password By NextGenApps",
          html: `<p>
              <b>Your Login Details for NextGenApps System</b>
              <br>
                <b>Email: </b>${results[0].email}
              </br>
              <br>
                <b>Password: </b>${results[0].password}
              </br>
              <br>
              <a href='www.google.com'>Click here to login</a></br>
            </p>`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log(info.response);
          }
        });
        return res
          .status(200)
          .json({ message: "Password Sent Succesfully to Your Email" });
      }
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  });
});

module.exports = router;
