import React from 'react'
import {connect } from "react-redux"

export function Message(props) {
  console.log(props)
  return <div id="message">{props.infoMessage}</div>
}
export default connect(st=>st)(Message)
