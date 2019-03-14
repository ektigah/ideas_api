class IdeasContainer extends React.Component {
  

constructor(props) {
  super(props)
  this.state = {
    ideas: [], editingIdeaId: null

  }
  this.addNewIdea = this.addNewIdea.bind(this)
}  
 
  
componentDidMount(){
  fetch('/api/v1/ideas.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ ideas: data }) });
  }
 
  

addNewIdea(response) {
      let name = JSON.stringify({idea: {title: '', body:   ''} })
    fetch('/api/v1/ideas.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'     
      },
     body: name,
    }).then((response) => {return response.json()})
    .then((idea)=>{
      console.log(idea)
      this.setState({ ideas: [idea].concat(this.state.ideas), editingIdeaId: idea.id
    })
  })   
  }
  
  
  
  
render(){

  var ideas = this.state.ideas.map((idea) => {

  if(this.state.editingIdeaId === idea.id) {
    return(<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea}  />)
  } 
    else 
  {
    return (<Idea idea={idea} key={idea.id} />)
  }
    
  })
 
  return(
  <div>
    <div>  
      <button className="newIdeaButton" onClick={this.addNewIdea}>
        New Idea
      </button>  
    </div> 

   <div>
   {ideas}
   </div>
 </div>
 )
 
 

}
  
  
  
  
}
