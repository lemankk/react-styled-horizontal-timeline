import React from "react";
import PropTypes from "prop-types";
import DotOutline from "./styled/DotOutline";
import DotWrapper from "./styled/DotWrapper";
import DotButton from "./styled/DotButton";
import DotLabel from "./styled/DotLabel";

/**
 * The markup for one single dot on the timeline
 *
 * @param {object} props The props passed down
 * @return {StatelessFunctionalReactComponent} The markup for a dot
 */
const EventDot = ({
  selected = 0,
  index = 0,
  dotType = "present",
  date = "",
  onClick = () => null,
  labelWidth = 0,
  label = "",
  distanceFromOrigin = 0,
  styles = {},
}) => {
  return (
    <DotWrapper
      styles={styles}
      key={date}
      id={`timeline-dot-${date}`}
      type={dotType}
      left={distanceFromOrigin - labelWidth / 2}
      width={labelWidth}
      className={`${dotType} dot-label`}
    >
      <DotButton
        styles={styles}
        onClick={() => onClick(index)}
        type={dotType}
        width={labelWidth}
      >
        <DotLabel styles={styles} type={dotType}>{label}</DotLabel>
        <DotOutline styles={styles} type={dotType} />
      </DotButton>
    </DotWrapper>
  );
};

/**
 * propTypes
 * @type {Object}
 */
EventDot.propTypes = {
  // The index of the currently selected dot (required to style as old, present, or future event)
  selected: PropTypes.number.isRequired,
  // The index of the present event (used for deciding the styles alongside selected)
  index: PropTypes.number.isRequired,
  // The actual date of the event (used as key and id)
  date: PropTypes.string.isRequired,
  // The onClick handler ( in this case to trigger the fillingMotion of the timeline )
  onClick: PropTypes.func.isRequired,
  // The date of the event (required to display it)
  label: PropTypes.string.isRequired,
  // The width you want the labels to be
  labelWidth: PropTypes.number.isRequired,
  // The numerical value in pixels of the distance from the origin
  distanceFromOrigin: PropTypes.number.isRequired,
  // The styles prefrences of the user
  styles: PropTypes.object.isRequired,

  dotType: PropTypes.string.isRequired,
};

export default EventDot;
