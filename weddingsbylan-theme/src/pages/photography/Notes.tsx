import React, { useEffect, useRef, useState } from 'react'
import './Notes.scss'

interface Note {
  id: number
  text: string
}

const notes: Note[] = [
  { id: 1, text: 'Nullam ac justo efficitur, tristique ligula a, pellentesque ipsum. Nullam ac justo efficitur, tristique ligula a, pellentesque ipsum.' },
  { id: 2, text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.' },
  { id: 3, text: 'Praesent laoreet sapien sit amet massa ornare, in pretium ex elementum.' },
  { id: 4, text: 'Curabitur nec arcu nec nulla scelerisque condimentum.' }
]

const Notes = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const lastScrollY = useRef(0)
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down')

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current) {
        setScrollDir('down')
      } else {
        setScrollDir('up')
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view', scrollDir)
          }
        })
      },
      { threshold: 0.2 }
    )

    refs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      refs.current.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [scrollDir])

  return (
    <div className='notes'>
      <h2 className='title'>Guidelines & Tips</h2>

      <h3 className='subtitle'>Quick help to get you started</h3>

      <div className='timeline'>
        <div className='timeline-line'></div>

        {notes.map((note, index) => (
          <div
            key={note.id}
            className={`timeline__item ${index % 2 === 0 ? 'left' : 'right'}`}
            ref={(el) => {
              refs.current[index] = el
            }}
          >
            <div className='timeline__card'>
              <p>
                <em>{note.text}</em>
              </p>
            </div>

            <div className='timeline__divider'>
              <svg className='timeline__svg' width='20' height='100' viewBox='0 0 20 200' xmlns='http://www.w3.org/2000/svg'>
                <line x1='10' y1='0' x2='10' y2='85' stroke='#4a3e5a' strokeWidth='1' />
                <polygon points='5,100 10,95 15,100 10,105' fill='#4a3e5a' />
                <line x1='10' y1='115' x2='10' y2='200' stroke='#4a3e5a' strokeWidth='1' />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes
