import React from 'react'
import {Game} from "../duck/store";
import GameCard from "./game-card";
import {makeStyles} from "@material-ui/core";
import useDialogs from "../hooks/dialogs";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {margin: theme.spacing(0, 2, 2, 0)}
  }
}), {name: 'games-list'})

function GamesList({games}: { games: Game[] }) {
  const {open} = useDialogs()
  const styles = useStyles()
  return (
    <section className={styles.root}>
      {games.map(
        (game: Game) => (
          <GameCard
            key={game.id}
            cover={game.cover[0]}
            title={game.title}
            onClick={() => open.gameDetails(game.id)}
          />)
      )}
    </section>
  )
}

export default GamesList
