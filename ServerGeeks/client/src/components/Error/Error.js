import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "@mantine/core";
import { AlertCircle } from "tabler-icons-react";

function Error() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/", { replace: true });
  }

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
        >
          Okay
        </Button>
      </Alert>
    </div>
  );
}

export default Error;
