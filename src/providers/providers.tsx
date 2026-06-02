// src/providers/Providers.tsx

"use client";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      {children}

      <Toaster />
    </SessionProvider>
  );
};

export default Providers;
