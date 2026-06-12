"use client";

import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="
        h-[70vh]
        flex
        flex-col
        items-center
        justify-center
        gap-2
      "
    >
      <MdErrorOutline size={80} color="red" />

      <h1
        className="
          text-2xl
          font-bold
        "
      >
        Something went wrong
      </h1>

      <p
        className="
          text-neutral-500
          text-center
        "
      >
        {error.message}
      </p>

      <div className="w-40">
        <button
          className="
            w-full
            bg-cyan-500
            text-white
            py-2
            rounded-full
            hover:bg-cyan-600
            transition
          "
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default Error;
