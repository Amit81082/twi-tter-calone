// app/loading.tsx

"use client";

import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className="
        h-[70vh]
        flex
        flex-col
        items-center
        justify-center
      "
    >
      <PuffLoader size={80} color="skyblue" />
    </div>
  );
};

export default Loading;
