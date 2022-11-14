import { Animal } from "@pet/animal";

interface PetProps {
  pet: Animal;
}

function Pet({ pet }: PetProps) {
  return (
    <>
      <a
        href="#"
        className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {pet.photos.length > 0 && (
          <img
            className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={pet.photos[0].medium}
            alt=""
          />
        )}

        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pet.name}
          </h5>
          <p>{pet.age}</p>
          <p>{pet.type}</p>
          <p>{pet.breeds.primary}</p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </a>
    </>
  );
}

export default Pet;