

const Header = (props) => {  
  const {title} = props;
  return ( 
    <h1>{title}</h1>
   );
}

const Part = (props) => {
  const {name, exercises} = props;
  return ( 
    <p>{name} {exercises}</p>
   );  
}

const Content = (props) => {
  const {parts} = props;
  return (  
    <div>{
      parts.map((part,index) => {
        return <Part key={index} name={part.name} exercises={part.exercises}/>
      })
    }
    </div>
  );
}

const Total = (props) => {
  const {parts} = props;
  let total = 0;
  props.parts.forEach(part => {
    total += part.exercises;
  });

  return ( 
    <p>Number of exercises {total}</p>
   );
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
      <Header title={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  );
}

export default App