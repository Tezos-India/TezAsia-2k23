import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";
import { refund } from "../../utils/operation";

function Error() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [transSuccess, setTransSuccess] = useState(false);

  function handleNavigate() {
    navigate("/", { replace: true });
  }

  const claimRefund = async () => {
    try {
      setLoading(true);
      await refund();
      alert("Game Ended")
      setTransSuccess(true)
    } catch (error) {
      setTransSuccess(false)
      throw error;
    }
    setLoading(false);
  };

  return (
    <div>
      <Alert icon={<AlertCircle size={19} />} title="Error!" color="orange">
        Some error happened. Please either create a new room or join a room.
        <Button
          size="xs"
          color="dark"
          sx={{
            display: "flex",
            marginTop: "4px",
          }}
          onClick={handleNavigate}
          disabled={!transSuccess}
        >
          Okay
        </Button>

        <Button
          color="dark"
          size="md"
          onClick={() => {
          claimRefund();
          }}
          disabled={transSuccess}
        >
          {loading ? "transacting...." : "Claim Your Refund"}
        </Button>
        
      </Alert>
    </div>
  );
}

export default Error;
