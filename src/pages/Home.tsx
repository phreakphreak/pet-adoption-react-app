import React from "react";

function Home() {
  return (
    <div className="flex justify-start gap-24 mt-20">
      <img src="pets.jpg" alt="pets" className="rounded-xl shadow-xl w-3/6 " />
      <div className="flex flex-col gap-10 items-center justify-start">
        <h1 className=" flex items-center text-black font-bold xl:text-9xl md:text-7xl">
          Pet Refugio
        </h1>
        <p>Proyecto Refugio para adoptar mascotas y poder darles un hogar</p>
      </div>
    </div>
  );
}

export default Home;
