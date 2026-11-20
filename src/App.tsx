import { useEffect } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import './App.css'

function App() {
  useEffect(() => {
    const about = document.getElementById('about')
    if (!about) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const duration = 650
    let previousY = window.scrollY
    let frameId: number | null = null

    const handleScroll = () => {
      const currentY = window.scrollY
      const aboutY = about.getBoundingClientRect().top + currentY
      const triggerY = aboutY * 0.85
      const crossedTrigger = previousY < triggerY && currentY >= triggerY
      previousY = currentY

      if (
        frameId !== null ||
        !crossedTrigger ||
        currentY >= aboutY ||
        reducedMotion.matches
      ) {
        return
      }

      const start = performance.now()

      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = (1 - Math.cos(progress * Math.PI)) / 2
        const nextY = currentY + (aboutY - currentY) * eased
        const finished = aboutY - nextY <= 1

        window.scrollTo({
          top: finished ? aboutY : nextY,
          behavior: 'instant',
        })

        frameId = finished ? null : window.requestAnimationFrame(animate)
      }

      frameId = window.requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <main>
      <section id="center" className="slide" aria-labelledby="intro">
        <div className="slide-content">
          <h1 id="intro">Hi, I’m Jayden.</h1>

          <a className="about-link" href="#about">
            About me ↓
          </a>

          <nav className="social-links" aria-label="Find me online">
            <a
              href="https://www.linkedin.com/in/jayden-m-le"
              aria-label="LinkedIn"
            >
              <FaLinkedin aria-hidden="true" />
            </a>

            <a href="https://github.com/jqydenle" aria-label="GitHub">
              <FaGithub aria-hidden="true" />
            </a>

            <a href="mailto:jaydenmle2006@gmail.com" aria-label="Email">
              <FaEnvelope aria-hidden="true" />
            </a>
          </nav>
        </div>
      </section>

      <section id="about" className="slide" aria-labelledby="about-heading">
        <div className="slide-content">
          <h2 id="about-heading">About me</h2>

          <p>
            I’m an Informatics student at the University of Washington
            interested in software and data engineering. I grew up playing
            video games, and I’ve always liked how the best ones give you a
            reason to come back. That’s the kind of thing I want to build.
          </p>

          <p>
            I enjoy working on both sides of an app: making it easy to use and
            figuring out how the data behind it should be organized.
          </p>

          <a className="about-link" href="#experience">
            Experience ↓
          </a>
        </div>
      </section>

      <section
        id="experience"
        className="slide"
        aria-labelledby="experience-heading"
      >
        <div className="slide-content">
          <h2 id="experience-heading">Experience</h2>

          <div className="experience-list">
            <article className="experience-entry">
              <h3>SAT Math Mentor</h3>
              <p className="experience-meta">
                Treehouse · June 2024 – September 2025
              </p>
              <p>
                Mentored students in SAT Math by breaking down difficult
                problems and teaching strategies for timed sections. The
                students I mentored improved their SAT Math scores by an average
                of 150 points.
              </p>
            </article>

            <article className="experience-entry">
              <h3>Math Masters Project Manager &amp; Founder</h3>
              <p className="experience-meta">
                Algebra 1 Learning Games · August 2024 – Present
              </p>
              <p>
                Collaborated with a team of 10+ to build an Algebra 1 practice
                platform that turns lessons into games. The platform spans 15
                units and includes more than 2,300 practice questions and 150
                games.
              </p>
            </article>
          </div>

          <a
            className="resume-link"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View résumé ↗
          </a>
        </div>
      </section>
    </main>
  )
}

export default App