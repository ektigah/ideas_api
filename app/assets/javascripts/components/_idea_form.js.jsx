
class IdeaForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.updateIdea = this.updateIdea.bind(this)
  }

handleInput(e){
  this.setState({[e.target.name]: e.target.value})
}

  
handleBlur() {
  const idea = {
    title: this.state.title,
    body: this.state.body
  }

  axios.put(
    `/api/v1/ideas/${this.props.idea.id}`,
    {
      idea: idea
    })
  .then(response => {
    console.log(response)
    this.props.updateIdea(response.data)
  })
  .catch(error => console.log(error))
}
  

updateIdea(idea){
  const ideaIndex = this.state.idea.findIndex(x => x.id === idea.id)
  const ideas = update(this.state.ideas, {
    [ideaIndex]: { $set: idea }
  })
  this.setState({ideas: ideas})
}
  
  render() {
    return (
      <div className="tile">
        <form onBlur={this.handleBlur}>
          <input className='input' type="text"
            name="title" placeholder='Enter a Title'
            value={this.state.title} onChange={this.handleInput} />
          <textarea className='input' name="body"
            placeholder='Describe your idea'
            value={this.state.body} onChange={this.handleInput}>
          </textarea>
        </form>

      </div>
    )
  }
}