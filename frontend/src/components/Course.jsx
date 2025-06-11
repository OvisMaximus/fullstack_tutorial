const Header = ({course}) => {
    const name = course.name
    return (
        <div>
            <h2>{name}</h2>
        </div>
    )
}
const Part = ({part}) => {
    const {name, exercises} = part
    return (
        <p>
            {name} {exercises}
        </p>
    )
}
const Content = ({course}) => {
    const parts = course.parts
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
        </div>
    )
}
const Total = ({course}) => {
    const parts = course.parts
    const sumOfExercises = parts.reduce((a, part) => a + part.exercises, 0)
    return (
        <div>
            <p>
                <b>total of {sumOfExercises} exercises</b>
            </p>
        </div>
    )
}
export const Course = ({course}) => {
    console.log(course)
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}