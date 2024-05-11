import React from "react";
import axios from "axios";
import "../styles/styles.css";

function UpgradePlan() {
  const handleUpgrade = async (plan) => {
    try {
      // Make a request to your backend to initiate the payment process
      const response = await axios.post("/api/upgrade", { plan });
      console.log("Upgrade response:", response.data);
      // Redirect the user to the payment page with the selected plan
      window.location.href = `/payment?plan=${plan}`;
    } catch (error) {
      console.error("Error upgrading plan:", error);
      // Handle error
    }
  };

  return (
    <div className="upgrade-plan-container" style={{ height: "100vh" }}>
      <div className="payment-plans">
        <div className="payment-plan" onClick={() => handleUpgrade("platinum")}>
          <div className="plan-header">Platinum Plan</div>
          <div className="plan-price">200 EGP/month</div>
          <h5> Unlimited files Upload</h5>
          <h5>Upload Up to 20GB</h5>
          <button onClick={() => handleUpgrade("platinum")}>Subscribe</button>
        </div>
        <div className="payment-plan" onClick={() => handleUpgrade("gold")}>
          <div className="plan-header">Gold Plan</div>
          <div className="plan-price">100 EGP/month</div>
          <h5>Up to 10 files</h5>
          <h5>Upload Up to 10GB</h5>
          <button onClick={() => handleUpgrade("gold")}>Subscribe</button>
        </div>
        <div className="payment-plan" onClick={() => handleUpgrade("silver")}>
          <div className="plan-header">Silver Plan</div>
          <div className="plan-price">50 EGP/month</div>
          <h5>Up to 5 files</h5>
          <h5>Upload up to 5GB</h5>
          <button onClick={() => handleUpgrade("silver")}>Subscribe</button>
        </div>
        <div className="payment-plan" onClick={() => handleUpgrade("free")}>
          <div className="plan-header">Free Plan</div>
          <div className="plan-price">Limited Features</div>
          <h5> 2 files</h5>
          <h5>UP to 1GB</h5>
          <button onClick={() => handleUpgrade("free")}>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default UpgradePlan;
