import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

function UpgradePlan() {
  return (
    <div className="upgrade-plan-container" style={{ height: "100vh" }}>
      <div className="payment-plans">
        <Link
          to={{ pathname: "/payment", state: { plan: "platinum" } }}
          className="payment-plan"
        >
          <div className="plan-header">Platinum Plan</div>
          <div className="plan-price">200 EGP/month</div>
          <h5> Unlimited files Upload</h5>
          <h5>Upload Up to 20GB</h5>
        </Link>
        <Link
          to={{ pathname: "/payment", state: { plan: "gold" } }}
          className="payment-plan"
        >
          <div className="plan-header">Gold Plan</div>
          <div className="plan-price">100 EGP/month</div>
          <h5>Up to 10 files</h5>
          <h5>Upload Up to 10GB</h5>
        </Link>
        <Link
          to={{ pathname: "/payment", state: { plan: "silver" } }}
          className="payment-plan"
        >
          <div className="plan-header">Silver Plan</div>
          <div className="plan-price">50 EGP/month</div>
          <h5>Up to 5 files</h5>
          <h5>Upload up to 5GB</h5>
        </Link>
        <Link
          to={{ pathname: "/payment", state: { plan: "free" } }}
          className="payment-plan"
        >
          <div className="plan-header">Free Plan</div>
          <div className="plan-price">Limited Features</div>
          <h5> 2 files</h5>
          <h5>UP to 1GB</h5>
        </Link>
      </div>
    </div>
  );
}

export default UpgradePlan;
