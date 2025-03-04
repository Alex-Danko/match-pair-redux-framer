import './App.css'
import { GameOverScreen } from './components/GameOverScreen/GameOverScreen'
import { GameTable } from './components/GameTable/GameTable'
import { Settings } from './components/Settings/Settings'
import { Timer } from './components/Timer/Timer'



function App() {

  return (
    <>
      <Timer />
      <Settings />
      <GameTable />
      <GameOverScreen />
    </>
  )
}

export default App
