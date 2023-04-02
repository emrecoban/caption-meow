import React from "react";

export default function HonorUser({ displayName, score, rank }) {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>{rank}</td>
      <td>{displayName}</td>
      <td style={{ width: "20%", textAlign: "center" }}>{score} 🔺</td>
    </tr>
  );
}
