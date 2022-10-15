import React, { useState } from 'react'
import Dice from './Dice/Dice'
const RollDie = (props) => {
  const { sides, isDisabled, getScoreTotal } = props
  const [state, setState] = useState({
    die: 'one',
    rolling: false,
    totalScore: undefined,
  })
  const { die, rolling, totalScore } = state
  const roll = () => {
    const newDie = sides[~~(Math.random() * sides.length)]
    const score1 = Object.values(newDie)
    let score = score1[0]
    setState({
      die: Object.keys(newDie),
      rolling: true,
      totalScore: score1[0],
    })

    getScoreTotal(score)
  }
  return (
    <>
      <div className='roll-dice'>
        <div className='rolldice-container'>
          <Dice face={String(die)} rolling={rolling} />
        </div>
        <button onClick={roll} disabled={!isDisabled}>
          Roll Dice
        </button>
        <h2>Result: {totalScore}</h2>
      </div>
    </>
  )
}
RollDie.defaultProps = {
  sides: [
    { one: 1 },
    { two: 2 },
    { three: 3 },
    { four: 4 },
    { five: 5 },
    { six: 6 },
  ],
}
export default RollDie
