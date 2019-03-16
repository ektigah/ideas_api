
class IdeasContainer extends React.Component {
 
constructor(props) {
  super(props)
  this.state = {
    ideas: [], editingIdeaId: null, 
    notification: ''

  }
  this.addNewIdea = this.addNewIdea.bind(this)
  this.updateIdea = this.updateIdea.bind(this)
  this.resetNotification = this.resetNotification.bind(this)
  this.enableEditing = this.enableEditing.bind(this)
  this.deleteIdea = this.deleteIdea.bind(this)
  this.submitDeleteIdea = this.submitDeleteIdea.bind(this)

}  
 
  
componentDidMount(){
  fetch('/api/v1/ideas.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ ideas: data }) });
  }
 
  

addNewIdea() {
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
  
  
  updateIdea(idea){
  const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id)
  const ideas = update(this.state.ideas, {
    [ideaIndex]: { $set: idea }
  })
  this.setState({ideas: ideas,
  notification: 'All changes saved'})
}
  
  resetNotification(){
  this.setState({notification: ''})
}
  
  
  enableEditing(id) {
  this.setState({editingIdeaId: id},
    () => { this.title.focus() })
}
  
submitDeleteIdea(id){
    fetch('/api/v1/ideas/'+ id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
            this.deleteIdea(id)
          })
      .catch(error => console.log(error));
    }
  
  deleteIdea(id){
        this.setState({
          ideas: this.state.ideas.filter((f) => f.id !== id),
          notification: "Idea removed"
        })
      }

  
render(){

  var ideas = this.state.ideas.map((idea) => {

  if(this.state.editingIdeaId === idea.id) {
    return(<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea}  titleRef= {input => this.title = input} resetNotification={this.resetNotification}/>)
  } 
    else 
  {
    return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing} onDelete={this.submitDeleteIdea} />)
  }
    
  })
 
  return(
  <div>
    <div>  
      <button className="newIdeaButton" onClick={this.addNewIdea}>
        New Idea
      </button>  
      <span className="notification">
        {this.state.notification}
      </span>

    </div> 

   <div>
   {ideas}
   </div>
 </div>
 )

}

}
