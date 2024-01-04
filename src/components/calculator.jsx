import { useState } from 'react'
import '../App.css'

function Calculator() {
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [initialChips, setInitialChips] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentPot, setCurrentPot] = useState(0);
  const [currentChip, setCurrentChip] = useState(0);
  const [bigBlind, setBigBlind] = useState(0);
  const [smallBlind, setSmallBlind] = useState(0);
  const [bet, setBet] = useState(0);
  const [playerChips, setPlayerChips] = useState([]);
  const [chipsInGame, setChipsInGame] = useState([]);
  const [playerStillInGame, setPlayerStillInGame] = useState([]);
  const [numPlayerStillInGame, setNumPlayerStillInGame] = useState(maxPlayers);
  const [winner, setWinner] = useState(0);
  const initializeGame = (numPlayers, numChips) => {
    setMaxPlayers(numPlayers);
    setBigBlind(1);
    setSmallBlind(0);
    setCurrentPot(0);
    setCurrentChip(0);
    setPlayerChips(Array(numPlayers).fill(numChips));
    setChipsInGame(Array(numPlayers).fill(0));
    setPlayerStillInGame(Array(numPlayers).fill(true));
    setNumPlayerStillInGame(numPlayers);
  };

  const updateChipCount = (playerIndex, newChipCount) => {
    const newPlayerChips = [...playerChips];
    newPlayerChips[playerIndex] += newChipCount;
    setPlayerChips(newPlayerChips);
  };

  const nextPlayer = () => {
    let nextPlayerIndex = (currentPlayer + 1) % maxPlayers;
    while (!playerStillInGame[nextPlayerIndex]) {
      nextPlayerIndex = (nextPlayerIndex + 1) % maxPlayers;
    }
    setCurrentPlayer(nextPlayerIndex);
  };

  const fold = () => {
    setNumPlayerStillInGame(numPlayerStillInGame-1);
    if (numPlayerStillInGame == 0) {
      alert("last one folding!");
    } else {
      const newPlayerStillInGame = [...playerStillInGame];
      newPlayerStillInGame[currentPlayer] = false;
      setPlayerStillInGame(newPlayerStillInGame);
      nextPlayer();
    }
  }

  const call = () => {
    const chipsNeededToMatchPot = currentPot - chipsInGame[currentPlayer];
    if (chipsNeededToMatchPot > 0) {
      if (chipsNeededToMatchPot <= playerChips[currentPlayer]) {
        updateChipCount(currentPlayer, -chipsNeededToMatchPot);
        const newChipsInGame = [...chipsInGame];
        newChipsInGame[currentPlayer] += chipsNeededToMatchPot;
        setChipsInGame(newChipsInGame);
        setCurrentChip(currentChip + chipsNeededToMatchPot);
      } else { //All in logic
        updateChipCount(currentPlayer, -playerChips[currentPlayer]);
        const newChipsInGame = [...chipsInGame];
        newChipsInGame[currentPlayer] += playerChips[currentPlayer];
        setChipsInGame(newChipsInGame);
        setCurrentChip(currentChip + playerChips[currentPlayer]);
        alert("player ${currentPlayer+1} all in");
      }
    }
    nextPlayer();
  }

  const reset = (winner) => {
    if (winner < 0 || winner >= maxPlayers) {
      alert("Invalid winner number!");
      return;
    }
    updateChipCount(winner-1,currentChip);
    rotateBlind();
    setCurrentChip(0);
    setCurrentPot(0);
    setChipsInGame(Array(maxPlayers).fill(0));
    setPlayerStillInGame(Array(maxPlayers).fill(true));
    setNumPlayerStillInGame(maxPlayers);
    setCurrentPlayer(bigBlind);
  }

  const payBlinds = () => {
    const newPlayerChips = [...playerChips];
    newPlayerChips[bigBlind] -= 10;
    newPlayerChips[smallBlind] -= 5;
    setPlayerChips(newPlayerChips);
    const newChipsInGame = [...chipsInGame];
    newChipsInGame[bigBlind] += 10;
    newChipsInGame[smallBlind] += 5;
    setChipsInGame(newChipsInGame);
    setCurrentPot(currentPot + 10);
    setCurrentChip(currentChip + 15);

  }

  const raise = (betValue) => {
    if (betValue > playerChips[currentPlayer]) {
      alert("Insufficient chips to raise!");
      return;
    }
    if (betValue <= 0) {
      alert("Invalid bet amount!");
      return;
    }
    updateChipCount(currentPlayer, -betValue);
    setCurrentChip(currentChip+betValue);
    setCurrentPot(currentPot+betValue);
    const newChipsInGame = [...chipsInGame];
    newChipsInGame[currentPlayer] += betValue;
    setChipsInGame(newChipsInGame);
    nextPlayer();
  }

  const rotateBlind = () => {
    setBigBlind((bigBlind + 1) % maxPlayers);
    setSmallBlind((smallBlind + 1) % maxPlayers);
  }

  return (
    <div>
      <br/>
      <input type="number" placeholder="# of players" onChange={(e) => setMaxPlayers(parseInt(e.target.value,10))} />
      <input type="number" placeholder="# of beginning chips" onChange={(e) => setInitialChips(parseInt(e.target.value,10))} />
      <button onClick={() => initializeGame(maxPlayers, initialChips)}>Start Game with {maxPlayers} Players, {initialChips} Chips each.</button>
      <br/>
      <h2>Player {currentPlayer + 1}'s turn, need {Math.max(0, currentPot-chipsInGame[currentPlayer])} chips to call</h2>
      <div className='players'>
      {playerChips.map((chipCount, index) => (
        <div key={index}>
          Player {index + 1}: {chipCount} chips
        </div>
      ))}
      </div>
      <br/>
      <button onClick={() => payBlinds()}>Pay Blinds</button>
      <button onClick={() => fold()}>Fold</button>
      <button onClick={() => call()}>Call</button>
      <input type="number" onChange={(e) => setBet(parseInt(e.target.value,10))} />
      <button onClick={() => raise(bet)}>Raise {bet}</button>
      <br/>
      <br/>
      <div>Current Pot: {currentPot}</div>
      <br/>
      <div>Current Chip: {currentChip}</div>
      <br/>
      <div>Current Big blind: {bigBlind+1}, Small blind: {smallBlind+1}</div>
      <br/>
      <input type="number" placeholder="# of player won" onChange={(e) => setWinner(parseInt(e.target.value,10))} />
      <button onClick={() => reset(winner)}>Player {winner} wins, next round</button>
      </div>
  )
}

export default Calculator
