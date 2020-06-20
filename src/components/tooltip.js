import dom from 'jsx-render';
import JSXComponent from 'jsx-render/lib/JSXComponent'

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