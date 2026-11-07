import { Cover } from './components/Cover'
import { RecruiterView } from './components/RecruiterView'
import { TopNav } from './components/TopNav'
import { useRecruiterMode } from './hooks/useRecruiterMode'

export default function App() {
  const [recruiterMode, setRecruiterMode] = useRecruiterMode()

  return (
    <>
      <TopNav recruiterMode={recruiterMode} onToggle={setRecruiterMode} />
      {recruiterMode ? <RecruiterView /> : <main><Cover /></main>}
    </>
  )
}
