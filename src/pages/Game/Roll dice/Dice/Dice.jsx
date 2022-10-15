import React from 'react'
import './Dice.css'

const Dice = ({ face, rolling }) => {
  return <i className={`die fas fa-dice-${face} ${rolling && 'shaking'}`} />
}
export default Dice
