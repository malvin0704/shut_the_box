import React, { useState } from 'react'
import Dice from './Dice/Dice'
const RollDice = (props) => {
  const { sides, isDisabled, getScoreTotal } = props
  const [state, setState] = useState({
    die1: 'one',
    die2: 'six',
    rolling: false,
    totalScore: undefined,
  })
  const { die1, die2, rolling, totalScore } = state
  const roll = () => {
    const newDie1 = sides[~~(Math.random() * sides.length)]
    const newDie2 = sides[~~(Math.random() * sides.length)]
    const score1 = Object.values(newDie1)
    const score2 = Object.values(newDie2)
    let score = score1[0] + score2[0]
    setState({
      die1: Object.keys(newDie1),
      die2: Object.keys(newDie2),
      rolling: true,
      totalScore: score1[0] + score2[0],
    })

    getScoreTotal(score)
  }
  return (
    <>
      <div className='roll-dice'>
        <div className='rolldice-container'>
          <Dice face={String(die1)} rolling={rolling} />
          <Dice face={String(die2)} rolling={rolling} />
        </div>
        <button onClick={roll} disabled={!isDisabled}>
          Roll Dice
        </button>
        <h2>Result: {totalScore}</h2>
      </div>
    </>
  )
}
RollDice.defaultProps = {
  sides: [
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
  ],
}
export default RollDice
