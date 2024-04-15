

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
    const total = parts.reduce((s, p) => 
      s + p.exercises, 0
    )
  
    return ( 
      <h4>Number of exercises {total}</h4>
     );
  }
  
  const Course = (props) => {
    const {course} = props;
  
    return ( 
      <div>
        <Header title={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
     );
  }
  
  const Courses = (props) => {
    const {courses} = props;
    return (
      <div>
        {
          courses.map((course, index) => {
            return <Course key={index} course={course} />
          })
        }
      </div>
    );
  }

  export default Courses;