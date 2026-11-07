import { CaseFiles } from './components/CaseFiles'
import { ComicFooter, Mission, SideQuests, Signal } from './components/ClosingChapters'
import { Cover } from './components/Cover'
import { Encounters } from './components/Encounters'
import { Introduction } from './components/Introduction'
import { TopNav } from './components/TopNav'
import { TrainingArc } from './components/TrainingArc'

export default function App() {
  return (
    <>
      {/* Torn newsprint down both sides of the page. Decorative only. */}
      <div aria-hidden="true" className="torn-edge torn-edge-left"><span /></div>
      <div aria-hidden="true" className="torn-edge torn-edge-right"><span /></div>
      <TopNav />
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
      <Encounters />
    </>
  )
}
