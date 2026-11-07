import { CaseFiles } from './components/CaseFiles'
import { Cover } from './components/Cover'
import { OriginStory } from './components/OriginStory'
import { RecruiterView } from './components/RecruiterView'
import { TopNav } from './components/TopNav'
import { TrainingArc } from './components/TrainingArc'
import { useRecruiterMode } from './hooks/useRecruiterMode'

export default function App() {
  const [recruiterMode, setRecruiterMode] = useRecruiterMode()

  return (
    <>
      <TopNav recruiterMode={recruiterMode} onToggle={setRecruiterMode} />
      {recruiterMode ? (
        <RecruiterView />
      ) : (
        <main>
          <Cover />
          <OriginStory />
          <TrainingArc />
          <CaseFiles />
        </main>
      )}
    </>
  )
}
