import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import './index.css';
import { Info } from "@mui/icons-material";

export function TinyAlert({ title, closed, timeToClose }) {
  const [isClose, setIsClose] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  let referer = useRef(null);

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false); // Пометить компонент как не первоначальный
      return;
    }

    if (!closed) {
      setTimeout(() => {
        setIsClose(false);
        setTimeout(() => {
          setIsClose(true);
        }, timeToClose);
      });
    }
  }, [closed, timeToClose, isInitialRender]);

  const animationClass = isClose ? "down" : "up";

  return (
    <>
      <div
        ref={referer}
        className={`cat ${isInitialRender ? "" : animationClass}`}
        style={{
          background: "green",
          display: "flex",
          position: "fixed",
          left: "30px",
          bottom: "20px",
        }}
      >
        <Box sx={{ display: "flex", padding: "5px 30px" }}>
          <Info />
          <Typography variant="h8">{title}</Typography>
        </Box>
      </div>
    </>
  );
}
