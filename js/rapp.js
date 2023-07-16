'use strict';

// REACT JS 

// create component called Hello
const Hello = React.createClass({
  getDefaultProps: ()=> {
    return {    
      name: "the vault",
      link: "http://srrc.com/test"
    }
  },
    
  render: function() {
    return (
            <div>
                <h1>doing it in {this.props.name}</h1>
                <h1><a href={this.props.link}>babeeee!!!</a></h1>
                <h1><a onClick={this.onClick.bind(this, 'You trigger event1', 'You triggered event 2')} href="#">Trigger an 'Event'</a></h1>
            </div>
           )
    },

  onClick: function(event1, event2) {
      alert(event1);
    }

});
//end create component
//add component to page/dom
ReactDOM.render(
  <Hello />, document.getElementById('container')
);


