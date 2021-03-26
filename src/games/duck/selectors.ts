import {useSelector} from "react-redux";
import {Game, Store} from "./store";

function useSelectors() {
  const {items, list} = useSelector<{ games: Store }, Store>(store => store.games)

  const count: number = list.length
  const isEmpty: boolean = !list.length
  const games: Game[] = Object.values(items).map(i => i)
  const gameById = (id: string): Game => items[id]

  return {count, isEmpty, games, gameById}
}

export default useSelectors
