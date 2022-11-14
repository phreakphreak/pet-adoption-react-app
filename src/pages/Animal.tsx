import { Suspense } from "react";
import PetList from "../components/PetList";
import { usePet } from "../context/PetContext";

function Pets() {
  const { state } = usePet();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PetList />
    </Suspense>
  );
}

export default Pets;
