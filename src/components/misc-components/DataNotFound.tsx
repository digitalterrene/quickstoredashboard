"use client";
import Image from "next/image";
import React from "react";

export default function DataNotFound({ data }: { data: string }) {
  return (
    <div className="flex items-center flex-col w-full h-full justify-center p-20">
      <div className="mx-auto  w-fit">
        <Image
          alt="Data not found"
          className="object-cover"
          src="/images/not-found.jpg" // Path to the image in the public folder
          width={200}
          height={200}
        />
        <p className=" text-center">No {data} found</p>
      </div>
    </div>
  );
}
