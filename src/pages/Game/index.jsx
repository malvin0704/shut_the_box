import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RollDice from './Roll dice/RollDice'
import RollDie from './Roll dice/Roll Die'
import '../../sass/index.scss'
import axios from 'axios'
export default function Game() {
  const navigate = useNavigate()
  const [leftScore, setLeftScore] = useState(45)
  const [isDisabled, setIsDisabled] = useState(true)
  const [total, setTotal] = useState(0)
  const [scores, setScores] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const getScoreTotal = (scoreTotal) => {
    setTotal(scoreTotal)
    setIsDisabled(!isDisabled)
  }
  const handleSubmit = () => {
    let score = scores
      .map(Number)
      .reduce((prevItem, currentItem) => prevItem + currentItem)
    if (score === total) {
      setIsDisabled(!isDisabled)
      setLeftScore(leftScore - score)
      setScores([])
      score = 0
      for (let i = 0; i < scores.length; i++) {
        let box = document.getElementById(scores[i])
        box.disabled = !box.disabled
      }
    } else {
      alert('The sum of the boxes you selected does not match to result')
    }
  }
  const handleClick = (e) => {
    let { checked, value } = e.target
    if (checked) {
      setScores([...scores, value])
    } else {
      setScores(scores.slice(0, -1))
    }
  }
  const handleQuit = async () => {
    let submit = document.getElementById('submit')
    document.getElementById('submit').disabled = true
    document.getElementById('quit').disabled = true
    alert(leftScore)
    let score = leftScore
    const data = await axios.get('http://localhost:3000/score', {
      params: { username, score, password },
    })
  }
  useEffect(() => {
    let cookie = document.cookie
    let value = cookie.split('=')[1]
    if (!cookie) {
      navigate('/login')
    } else {
      const fetchData = async () => {
        const data = await axios
          .post(
            'http://localhost:3000/game',
            {
              _id: value,
            },
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              withCredentials: true,
            }
          )
          .then((response, err) => {
            const { username, password } = response.data
            setUserName(username)
            setPassword(password)
            console.log(response.data)
          })
      }
      fetchData()
    }
  }, [])
  return (
    <div id='containenr'>
      <h1>Shut The Box</h1>
      <section>
        <h2> The Rules</h2>
        <ul type='i'>
          <li>
            Each turn, you roll the dice(or die) and select 1 or more boxes
            which sum to the value of your roll.
          </li>
          <li>
            You will not be allowed to be pick the boxes which you choose on
            subsequent turns.
          </li>
          <li>
            When the sum of the boxes which are left is less than or equal to 6,
            you will only roll a single die.
          </li>
          <li>
            When you cannot make a move or you give up, the sum of the boxes
            which are left gives your score.
          </li>
          <li>
            Lower scires are better and a score of 0 is called "shutting the
            box".
          </li>
        </ul>
      </section>
      <section>
        <h2>Roll Dice</h2>
        {leftScore <= 6 ? (
          <RollDie isDisabled={isDisabled} getScoreTotal={getScoreTotal} />
        ) : (
          <RollDice isDisabled={isDisabled} getScoreTotal={getScoreTotal} />
        )}
      </section>
      <section>
        <h2>Box selection</h2>
        <table>
          <thead>
            <tr>
              <td>
                <label htmlFor='1'> 1</label>
              </td>
              <td>
                <label htmlFor='2'> 2</label>
              </td>
              <td>
                <label htmlFor='3'> 3</label>
              </td>
              <td>
                <label htmlFor='4'> 4</label>
              </td>
              <td>
                <label htmlFor='5'> 5</label>
              </td>
              <td>
                <label htmlFor='6'> 6</label>
              </td>
              <td>
                <label htmlFor='7'> 7</label>
              </td>
              <td>
                <label htmlFor='8'> 8</label>
              </td>
              <td>
                <label htmlFor='9'> 9</label>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='checkbox' id='1' value='1' onClick={handleClick} />
              </td>
              <td>
                <input type='checkbox' id='2' value='2' onClick={handleClick} />
              </td>
              <td>
                <input type='checkbox' id='3' value='3' onClick={handleClick} />
              </td>
              <td>
                <input type='checkbox' id='4' value='4' onClick={handleClick} />
              </td>
              <td>
                <input type='checkbox' id='5' value='5' onClick={handleClick} />
              </td>
              <td>
                <input
                  type='checkbox'
                  id='6'
                  value='6'
                  onChange={handleClick}
                />
              </td>
              <td>
                <input type='checkbox' id='7' value='7' onClick={handleClick} />
              </td>
              <td>
                <input type='checkbox' id='8' value='8' onClick={handleClick} />
              </td>
              <td>
                <input type='checkbox' id='9' value='9' onClick={handleClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <button
        type='submit'
        id='submit'
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        Submit Box Selection
      </button>
      <br />
      <br />
      <button id='quit' type='submit' onClick={handleQuit}>
        I give up /I can't make a valid move
      </button>

      <footer>
        <hr />
        <small>&copy; Miao Wang, 2022</small>
      </footer>
    </div>
  )
}
