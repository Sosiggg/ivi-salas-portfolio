import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

function App() {
  return (
    <div className="snap-container bg-white">
      <Navbar />
      <main>
        <section className="snap-section h-screen">
          <Hero />
        </section>
        <section className="snap-section min-h-screen">
          <About />
        </section>
        <section className="snap-section min-h-screen">
          <Services />
        </section>
        <section className="snap-section min-h-screen">
          <Skills />
        </section>
        <section className="snap-section min-h-screen">
          <Projects />
        </section>
        <section className="snap-section min-h-screen">
          <Contact />
        </section>
      </main>
    </div>
  )
}

export default App
