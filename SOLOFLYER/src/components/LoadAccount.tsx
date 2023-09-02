import React from 'react'
import { Button } from "../styled/Button";
import { useState } from "react";

const LoadAccount = ({toggle}) => {
    const [showRules, setShowRules] = useState(false);
  return (
    <Button onClick={toggle}>Play Now</Button>
  );
}

export default LoadAccount