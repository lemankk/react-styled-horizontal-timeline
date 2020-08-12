import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import StyledEventLine from "./styled/EventLine";


/**
 * The markup Information for an event Line. You can stack multiple lines on top of eachother
 *
 * @param  {object} props The props from parent, styling and positioning
 * @return {StatelessFunctionalReactComponent} Markup Information for the event line.
 */
const EventLine = ({left, width, fillingMotion, styles, type = "full"}) => (
  <Motion style={{
    tWidth: spring(width, fillingMotion),
    tLeft: spring(left, fillingMotion),
  }}>{({tWidth, tLeft}) =>
    <StyledEventLine
      aria-hidden={true}
      className="timeline-eventline"
      left={tLeft}
      width={tWidth}
      type={type}
      styles={styles}
    />
    }</Motion>
);


EventLine.propTypes = {
  // Location and dimension
  left: PropTypes.number,
  width: PropTypes.number,
  // how the filling motion will look like when in action
  fillingMotion: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
  }),
  // What color the line should have
  backgroundColor: PropTypes.string,
}


export default EventLine;