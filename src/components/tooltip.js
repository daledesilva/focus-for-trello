

class Tooltip extends JSXComponent {

  render(props) {
    //return <span baz={props.baz} qux={this.props.qux} />
    return (
        <span className="test" title={props.title} >
            {this.props.children}
        </span>
    )
  }

}

export default Tooltip;

export { Tooltip };