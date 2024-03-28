import { type FC, Fragment, useContext } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { usePokemon } from "@/hooks/usePokemon"
import { PokemonContext } from "@/context/PokemonContext"
import { background } from "@/utils/constants/BackgroundsByType"

export const ModalDetails: FC = () => {
  const { selectedPokemon, setSelectedPokemon } = useContext(PokemonContext);
  const { pokemon } = usePokemon(selectedPokemon ?? "");

  console.log(pokemon, selectedPokemon, "asdasd")

  const closeModal = () => {
    setSelectedPokemon(null);
  }
  const isOpen = !!selectedPokemon;
  const backgroundSelected = background[pokemon?.types[0]?.type?.name];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
        {/* OVERLAY */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        {/* CONTENT */}
        <div className="fixed inset-0 overflow-y-auto text-black">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-[min(640px,90%)] transform flex-col gap-6 rounded-2xl bg-[#E4E4E4]  p-6 text-left shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-semibold leading-9 text-black">
                  <span className="text-xl font-semibold text-white px-4 py-2 rounded-md" style={{ background: backgroundSelected }}>
                    {pokemon?.name}
                  </span>
                </Dialog.Title>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <img
                        src={pokemon?.sprites?.other?.dream_world?.front_default ?? pokemon?.sprites?.front_default}
                        alt={pokemon?.name}
                        className="w-40 h-40"
                      />
                      <div className="flex gap-2">
                        {pokemon?.types.map((type, index) => (
                          <span key={`${pokemon.id}-${index}`} className="text-xs px-2 py-1 rounded-md">
                          {type.type.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <span className="text-sm font-semibold">Height: {pokemon?.height}</span>
                        <span className="text-sm font-semibold">Weight: {pokemon?.weight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-lg font-semibold">Base Stats</span>
                    <div className="flex flex-col gap-2">
                      {pokemon?.stats.map((stat, index) => (
                        <div key={`${pokemon.id}-${index}`} className="flex gap-2">
                          <span className="text-sm font-semibold">{stat.stat.name}</span>
                          <span className="text-sm font-semibold">{stat.base_stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
