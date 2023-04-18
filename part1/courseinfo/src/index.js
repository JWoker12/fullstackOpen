import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

const Header = ({course}) => {
    return (
        <>
            <h1>{course.name}</h1>
        </>
    )
}
const Part = ({part}) => {
    return (
        <>
            <p>
                {part.name} {part.exercises}
            </p>
        </>
    )
}
const Content = ({course}) => {
    const parts = course.parts.map(value => value)
    return (
        <>
            <Part part={parts[0]}/>
            <Part part={parts[1]}/>
            <Part part={parts[2]}/>
        </>
    )
}
const Total = ({course}) => {
    return (
        <>
            <p>
                Number of exercises {
                    course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
                }
            </p>
        </>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content course={course}/>
            <Total course={course} />
        </div>
    )
}

root.render(
<>
    <App />
</>
);
