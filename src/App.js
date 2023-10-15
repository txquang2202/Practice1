import "./App.css";

function Avatar() {
  return <img className="avatar" src="./11.png" alt="ass"></img>;
}
function Intro() {
  return (
    <>
      <h1>Hồ Quốc Suy</h1>
      <p>
        Full-stack developer, unity programming and also professor at the
        University of Science
      </p>
    </>
  );
}
function SkillList(props) {
  return (
    <div className="skill-list">
      <Skill name="Full-stack" color="green" emoji="💪" />
      <Skill name="Unity" color="red" emoji="💪" />
      <Skill name="Javasctipt" color="purple" emoji="💪" />
      <Skill name="Yêu ý" color="yellow" emoji="💪" />
      <Skill
        name="Nói chung là cái đéo gì cũng biết"
        color="brown"
        emoji="💪"
      />
    </div>
  );
}
function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.name}</span>
      <span>{props.emoji}</span>
    </div>
  );
}
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

export default App;
