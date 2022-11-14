import { Suspense } from "react";
import PetList from "../components/PetList";

function Pets() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PetList />
    </Suspense>
  );
}

export default Pets;
