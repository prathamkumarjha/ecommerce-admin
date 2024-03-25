// "use client";

// import { StoreModal } from "@/components/modals/store-modals";
// import { useState, useEffect } from "react";

// export const ModalProvider = () => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <>
//       <StoreModal />
//     </>
//   );
// };

"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modals";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
