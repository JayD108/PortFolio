import { ActivityStrip } from './components/ActivityStrip'
import { CaseFiles } from './components/CaseFiles'
import { Certifications } from './components/Certifications'
import { ComicFooter, SideQuests, Signal } from './components/ClosingChapters'
import { Cover } from './components/Cover'
import { Encounters } from './components/Encounters'
import { Extras } from './components/Extras'
import { InkSplash } from './components/InkSplash'
import { Introduction } from './components/Introduction'
import { NoteReader } from './components/NoteReader'
import { TopNav } from './components/TopNav'
import { TrainingArc } from './components/TrainingArc'

export default function App() {
  return (
    <>
      <TopNav />
      <main>
        <Cover />
        <ActivityStrip />
        <Introduction />
        <TrainingArc />
        <CaseFiles />
        <Certifications />
        <SideQuests />
        <Signal />
        <ComicFooter />
      </main>
      <Encounters />
      <Extras />
      <InkSplash />
      <NoteReader />
    </>
  )
}
