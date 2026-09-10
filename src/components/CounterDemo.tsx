// ทดลองเก็บจำนวนครั้งการคลิ้กปุ่มด้วย useState ใน React

"use client";

import { useState } from "react";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <button type="button" onClick={handleClick}>
      คลิกแล้ว {count} ครั้ง
    </button>
  );
}
