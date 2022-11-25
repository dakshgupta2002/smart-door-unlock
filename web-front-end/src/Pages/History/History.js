import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function History({ groupId }) {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await fetch(`/api/history/${groupId}`);

        const data = await res.json();

        setHistory(data.history);

        return data.history;

        // return data.history;
      } catch (err) {
        console.log(err);
      }
    };
  }, [groupId]);

  return (
    <div>
      <Header />
      <ToastContainer
        className="p-3"
        style={{ backgroundColor: "black", width: "100vw", minHeight: "100vh" }}
      >
        <Toast style={{ marginTop: "20px", marginLeft: "20px" }}>
          <Toast.Header closeButton={false}>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">David</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Locked the door!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
