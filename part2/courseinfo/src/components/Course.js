import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>{props.course}</h2>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    const { parts } = props

    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = (props) => {
    const total = props.parts.reduce(
        (previous_course, current_course) => {
            return previous_course + current_course.exercises
        }, 0
    )

    return (
        <div>
            <p>
                <b>total of {total} exercises</b>
            </p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course