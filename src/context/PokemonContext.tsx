import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  AllPokemonsResult,
  PokemonsByTypeResult,
  PokeType,
} from "../interfaces/types";

interface ContextProps {
  types: PokeType[];
  filterSelected: PokeType;
  pokemonsFiltered: string[] | null;
  changeTypeSelected: (type: PokeType | null) => void;
  setSelectedPokemon: (pokemon: string | null) => void;
  selectedPokemon: string | null;
  search: string;
  setSearch: (text: string) => void;
}

export const PokemonContext = createContext<ContextProps>({} as ContextProps);

interface Props {
  children: React.ReactNode;
}

const PokemonProvider = ({ children }: Props) => {
  const allPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";

  const defaultState: PokeType = {
    name: "All",
    url: allPokemonsUrl,
  };

  const [allPokemons, setAllPokemons] = useState(null);
  const [pokemonsFiltered, setPokemonsFiltered] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [types, setTypes] = useState([defaultState]);
  const [filterSelected, setFilterSelected] = useState(defaultState);

  const changeTypeSelected = async (type: PokeType) => {
    setFilterSelected(type);

    const { data } = await axios.get(type?.url ?? '');
    const pokemons = data?.pokemon?.map(
      ({ pokemon }: PokemonsByTypeResult) => pokemon?.url
    );

    type.name !== "All"
      ? setPokemonsFiltered(pokemons)
      : setPokemonsFiltered(allPokemons);
  };

  const getPokemonsType = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type");
    setTypes([...types, ...data.results]);
  };

  const getAllPokemons = async () => {
    const { data } = await axios.get(allPokemonsUrl);

    const pokemons = data?.results?.map(
      (pokemon: AllPokemonsResult) => pokemon?.url
    );

    setAllPokemons(pokemons);
    setPokemonsFiltered(pokemons);
  };

  const handleSetPokemon = (pokemon: string | null) => {
    if(pokemon === null) {
      setSelectedPokemon(null);
      return;
    }
    console.log(pokemon);
    setSelectedPokemon(pokemon);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = async (text: string) => {
    setSearch(text);

    if(text === "") {
      setPokemonsFiltered(allPokemons);
      return;
    }
    console.log(text, "MY TEXT");
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${text}`);
    const pokemons = `https://pokeapi.co/api/v2/pokemon/${data.id}`

    if(!pokemons) {
      setPokemonsFiltered(allPokemons);
      return;
    }
    setPokemonsFiltered([pokemons] as any)
  };

  const contextValue = useMemo(() => ({
    types,
    filterSelected,
    pokemonsFiltered,
    changeTypeSelected,
    selectedPokemon,
    setSelectedPokemon: handleSetPokemon,
    search,
    setSearch: handleSearch,
  }), [
    types, 
    filterSelected, 
    pokemonsFiltered, 
    changeTypeSelected, 
    selectedPokemon, 
    search, 
    handleSetPokemon, 
    handleSearch
  ]);

  useEffect(() => {
    getPokemonsType();
    getAllPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={contextValue}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
