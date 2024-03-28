import { useContext } from "react";
import { Filters } from "components/Filters";
import { Pagination } from "components/Pagination";
import { PokemonList } from "components/PokemonList";
import { PokemonContext } from "@/context/PokemonContext";
import { usePagination } from "@/hooks/usePagination";

import "@/pages/home.scss";
import { ModalDetails } from "@/components/ModalDetails";
import pokeapiLogo from 'assets/pokeapi_logo.png';

export const Home = () => {
  const { pokemonsFiltered, search, setSearch, changeTypeSelected } = useContext(PokemonContext);
  const { page, nextPage, previousPage, changePage } = usePagination();

  const perPage = 12;

  const handleSearch = async (text: string) => {
    changePage(1);
    setSearch(text.toLowerCase());
  }

  return (
    <div className="home">
      <div className="flex justify-center my-10">
        <img src={pokeapiLogo} alt="" />
      </div>
      <div className="flex justify-center mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search a pokemon"
          className="w-[80%] p-2 text-center border-2 border-gray-300 rounded-md"
        />
      </div>

      <Filters />
      <PokemonList
        page={page}
        perPage={perPage}
        pokemonsUrls={pokemonsFiltered}
      />
      <Pagination
        page={page}
        perPage={perPage}
        nextPage={nextPage}
        previousPage={previousPage}
        maxItems={pokemonsFiltered?.length ?? 0}
      />
      <ModalDetails />
    </div>
  );
};
