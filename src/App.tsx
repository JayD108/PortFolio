import { CaseFiles } from './components/CaseFiles'
import { ComicFooter, Mission, SideQuests, Signal } from './components/ClosingChapters'
import { Cover } from './components/Cover'
import { Introduction } from './components/Introduction'
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
          <Introduction />
          <TrainingArc />
          <CaseFiles />
          <Mission />
          <SideQuests />
          <Signal />
          <ComicFooter />
        </main>
      )}
    </>
  )
}
