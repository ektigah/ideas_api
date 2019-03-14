class IdeasContainer extends React.Component {
  

constructor(props) {
  super(props)
  this.state = {
    ideas: []
  }
}  
 
  
    componentDidMount(){
    fetch('/api/v1/ideas.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ ideas: data }) });
  }
 
  
  
  render(){

 var ideas = this.state.ideas.map((idea) => {
return (
  <div className="tile" key={idea.id} >
            <h4>{idea.title}</h4>
            <p>{idea.body}</p>
          </div>

)

 })
 
  return(
   <div>

    
   {ideas}
  </div>
 )
 
 

}
  
  
  
  
}
