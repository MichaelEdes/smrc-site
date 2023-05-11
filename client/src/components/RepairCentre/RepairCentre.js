import React, { useState } from "react";
import "./RepairCentre.css";
import axios from "axios";

const RepairCentre = () => {
  const [first_name, setFirstName] = useState("");
  const [surname, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [device_type, setDeviceType] = useState("");
  const [device_make, setDeviceMake] = useState("");
  const [device_model, setDeviceModel] = useState("");
  const [problem, setProblem] = useState("");
  const [other_notes, setOtherNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const report = {
      first_name,
      surname,
      email,
      device_type,
      device_make,
      device_model,
      problem,
      other_notes,
    };

    console.log(report);

    try {
      await axios.post("http://localhost:8800/device_repair", report);
      alert("Thank you for your report, we will be in touch shortly! 😁");
      setFirstName("");
      setSurName("");
      setEmail("");
      setDeviceType("");
      setDeviceMake("");
      setDeviceModel("");
      setProblem("");
      setOtherNotes("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="repair-centre-container">
      <h1 id="repair-centre-title">Repair Centre</h1>
      <div className="repair-centre">
        <div className="repair-centre-form-container">
          <h1 id="form-title">Tell us about your problem 😊</h1>
          <form className="repair-centre-form" onSubmit={handleSubmit}>
            <h1>First we need your details so we can contact you</h1>
            <br />
            <div className="form-user-details">
              <input
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <h1>Tell us about your device</h1>
            <br />
            <div className="form-device-selection">
              <br />
              <label>
                <input
                  type="radio"
                  value="phone"
                  checked={device_type === "phone"}
                  onChange={(e) => setDeviceType(e.target.value)}
                />
                Phone
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="tablet"
                  checked={device_type === "tablet"}
                  onChange={(e) => setDeviceType(e.target.value)}
                />
                Tablet
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="laptop"
                  checked={device_type === "laptop"}
                  onChange={(e) => setDeviceType(e.target.value)}
                />
                Laptop
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="tv"
                  checked={device_type === "tv"}
                  onChange={(e) => setDeviceType(e.target.value)}
                />
                TV
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="desktop"
                  checked={device_type === "desktop"}
                  onChange={(e) => setDeviceType(e.target.value)}
                />
                Desktop
              </label>
            </div>
            <br />
            <input
              type="text"
              placeholder="Device Make"
              value={device_make}
              onChange={(e) => setDeviceMake(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Device Model"
              value={device_model}
              onChange={(e) => setDeviceModel(e.target.value)}
            />
            <br />
            <h1>What problem are you experiencing?</h1>
            <br />
            <div className="form-problem-selection">
              <br />
              <label>
                <input
                  type="radio"
                  value="water damage"
                  checked={problem === "water damage"}
                  onChange={(e) => setProblem(e.target.value)}
                />
                Water Damage
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="cracked screen"
                  checked={problem === "cracked screen"}
                  onChange={(e) => setProblem(e.target.value)}
                />
                Cracked Screen
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="battery issues"
                  checked={problem === "battery issues"}
                  onChange={(e) => setProblem(e.target.value)}
                />
                Battery Issues
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="charging port"
                  checked={problem === "charging port"}
                  onChange={(e) => setProblem(e.target.value)}
                />
                Charging Port
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="network problems"
                  checked={problem === "network problems"}
                  onChange={(e) => setProblem(e.target.value)}
                />
                Network Problems
              </label>
            </div>
            <br />
            <h1>Anything else we should know (max 100 characters)</h1>
            <br />
            <input
              className="form-notes"
              placeholder="Other Notes (Max 100 Characters)"
              maxLength="100"
              value={other_notes}
              onChange={(e) => setOtherNotes(e.target.value)}
            />
            <br />
            <button id="form-submit-btn" type="submit">Submit</button>
          </form>
        </div>
        <div className="repair-centre-image">
          <img
            src={`${process.env.PUBLIC_URL}/images/iPhoneWoodenHandFixed.png`}
            alt="fixed iphone with screen on"
          />
        </div>
      </div>
    </div>
  );
};

export default RepairCentre;
