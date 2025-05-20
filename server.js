const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
var checkIn = "";
var checkOut = "";
var selectedRoom = "";
var numberOfAdults = "";
var Name = "";
var Phoneno = "";
var Email = "";
var Preference = "";
var textarea = "";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/sendemail", (req, res) => {
  const {
    name,
    phoneno,
    checkInDate,
    checkOutDate,
    room,
    adults,
    roompref,
    email,
    textarea,
  } = req.body;
  Name = name;
  Phoneno = phoneno;
  checkIn = checkInDate;
  checkOut = checkOutDate;
  selectedRoom = room;
  numberOfAdults = adults;
  RoomPref = roompref;
  Email = email;
  Textarea = textarea;
  console.log(
    Name,
    Phoneno,
    checkIn,
    checkOut,
    selectedRoom,
    numberOfAdults,
    RoomPref,
    Email,
    Textarea
  );
  sendEmail(
    Name,
    Phoneno,
    checkIn,
    checkOut,
    selectedRoom,
    numberOfAdults,
    RoomPref,
    Email,
    Textarea
  ).catch(console.error);
  res.json({ message: "Email sent successfully!" });
});

app.listen(4000, () => {
  setInterval(() => {
    console.log("Server is still running at", new Date().toISOString());
  }, 6000);
  console.log("Server is running on port 4000");
});
async function sendEmail(
  Name,
  Phoneno,
  checkIn,
  checkOut,
  selectedRoom,
  numberOfAdults,
  RoomPref,
  Email,
  Textarea
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "praneshdn816@gmail.com",
      pass: "icpebkrcskkaidwc",
    },
  });

  const info = await transporter.sendMail({
    from: "Executive Inn Hotel Room Enquiry <executiveinn.in>",
    to: "praneshsenthilkumar18@gmail.com",
    subject: "Room Enquiry",
    html: `<div>
    <p>Name: ${Name}</p>
    <p>Email: ${Email}</p>
    <p>Phone number: ${Phoneno}</p>
    <p>Check In Date: ${checkIn}</p>
    <p>Check Out Date: ${checkOut}</p>
    <p>Room Preference: ${RoomPref}</p>
    <p>Room: ${selectedRoom}</p>
    <p>Adults: ${numberOfAdults}</p>
    <p>Suggestions: ${Textarea}</p>
  </div>`,
  });

  console.log("Message sent: %s", info.messageId);
}
