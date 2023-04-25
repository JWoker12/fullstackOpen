import React from 'react'

const Header = ({name}) => {
    return(
        <>
            <h1>{name}</h1>
        </>
    )
}

const Content = ({parts}) => {
    const total = parts.map(part => part.exercises).reduce((acc, value) => acc + value, 0)
    return (
        <>
            {parts.map(part => (
                <Part key={part.id} part={part} />
            ))}

            <b>total of {total} exercises</b>
        </>
    )
}

const Part = ({part}) => {
    return <p>{part.name}: {part.exercises}</p>
}

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course