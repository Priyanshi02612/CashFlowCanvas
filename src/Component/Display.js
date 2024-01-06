import React, { Component } from 'react'

class Display extends Component {

  render() {
    const {data1} = this.props
    return (
        <div className="amount1">
      <marquee>  
        Total amount : {data1}
      </marquee>
      </div>
    )
  }
}

export default Display;
