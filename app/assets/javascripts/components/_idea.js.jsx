class Idea extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render () {
    return(
      <div className="tile">
        <span className="deleteButton" >
          x
        </span>
        <h4>
          {this.props.idea.title}
        </h4>
        <p>
          {this.props.idea.body}
        </p>
      </div>
    )
  }
}