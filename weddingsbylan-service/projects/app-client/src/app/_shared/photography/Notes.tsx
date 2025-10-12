import React, { FC, useEffect, useRef } from 'react'
import './Notes.scss'

export interface INote {
  id: number
  title: string
  text: string
}

const notes: INote[] = [
  { id: 1, title: 'Introduction', text: 'Nullam ac justo efficitur, tristique ligula a, pellentesque ipsum.' },
  { id: 2, title: 'Preparation', text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.' },
  { id: 3, title: 'Execution', text: 'Praesent laoreet sapien sit amet massa ornare, in pretium ex elementum.' },
  { id: 4, title: 'Summary', text: 'Curabitur nec arcu nec nulla scelerisque condimentum.' }
]

interface INotesProps {
  data?: INote[]
}

const Notes: FC<INotesProps> = ({ data = notes }) => {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
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
  }, [])

  return (
    <div className='notes'>
      <h2 className='typography-h2 title'>Guidelines & Tips</h2>
      <h3 className='typography-subtitle1 subtitle'>Quick help to get you started</h3>

      <div className='list'>
        {data?.map((note, index) => (
          <div
            key={note.id}
            className={`item ${index % 2 === 0 ? 'left' : 'right'}`}
            ref={(el) => {
              refs.current[index] = el
            }}
          >
            <div className='card'>
              <h3 className='typography-h5'>{note.title}</h3>
              <p>
                <em className='typography-h6'>{note.text}</em>
              </p>
            </div>

            <div className='divider'>
              <svg width='16' height='80' viewBox='0 0 16 80' xmlns='http://www.w3.org/2000/svg'>
                <line x1='8' y1='0' x2='8' y2='35' stroke='#4a3e5a' strokeWidth='1' />
                <circle cx='8' cy='40' r='3' fill='#4a3e5a' />
                <line x1='8' y1='45' x2='8' y2='80' stroke='#4a3e5a' strokeWidth='1' />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes
