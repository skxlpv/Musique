import React from "react";

export const GradientCard = ({ children }) => {
  return (
    <div class="w-[55rem] flex p-[1px] rounded-2xl bg-gradient-to-b from-neutral-800 to-black">
      <div class="rounded-2xl bg-black px-8 py-8 w-full">
        {children}
      </div>
    </div>
  );
};