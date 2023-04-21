import React from "react";
import {
  MdLocalShipping,
  MdLibraryAddCheck,
  MdAccountBalance,
} from "react-icons/md";
// import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping size={32}/>,
    },
    {
      label: <Typography>Confirm order</Typography>,
      icon: <MdLibraryAddCheck size={32}/>,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalance size={32}/>,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "dodgerblue" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
