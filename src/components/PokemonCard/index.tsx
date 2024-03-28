import { usePokemon } from "@/hooks/usePokemon";
import { PokeTypes, background } from "@/utils/constants/BackgroundsByType";
import { Loader } from "../Loader";

import styles from "./styles.module.scss";
import { PokemonContext } from "@/context/PokemonContext";
import { useContext } from "react";

interface Props {
  url: string;
}

export const PokemonCard = ({ url }: Props) => {
  const { pokemon } = usePokemon(url);
  const { setSelectedPokemon } = useContext(PokemonContext);
  
  const backgroundSelected = background[pokemon?.types[0]?.type?.name as PokeTypes ?? 'normal'];


  return (
    <div onClick={() => setSelectedPokemon(url)} className={styles.pokeCard}>
      <div style={{ borderColor: backgroundSelected }} className={styles.top}>
        <span style={{ color: backgroundSelected }}>#{pokemon?.id}</span>
        {pokemon?.sprites?.other?.dream_world?.front_default ||
        pokemon?.sprites?.front_default ? (
          <img
            src={
              pokemon?.sprites?.other?.dream_world?.front_default ||
              pokemon?.sprites?.front_default
            }
            alt={pokemon?.name}
          />
        ) : (
          <div className={styles.loadingContainer}>
            <Loader color={backgroundSelected} />
          </div>
        )}
      </div>
      <div style={{ background: backgroundSelected }} className={styles.bottom}>
        {pokemon?.name}
      </div>
    </div>
  );
};
