import { usePet } from "../context/PetContext";
import Filters from "./Filters";
import Pet from "./Pet";

function PetList() {
  const { state } = usePet();

  return (
    <div className="mt-20 gap-8 flex items-start justify-center flex-row">
      {state.isLoading && <p>Loading...</p>}

      {state.error && <p> Error fetching data</p>}

      {state.isSuccessFilters && <Filters />}

      {state.isSuccessPets && (
        <div className="flex flex-col w-2/3 gap-4">
          {state.isError && <p>{state.error}</p>}
          {state.isLoading && <p>Loading...</p>}
          {state.pets.length > 0 &&
            state.pets.map((pet) => {
              return <Pet key={pet.id} pet={pet} />;
            })}
        </div>
      )}
    </div>
  );
}

export default PetList;
