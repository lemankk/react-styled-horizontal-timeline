import React from "react";
import PropTypes from "prop-types";

// Decorators
import Dimensions from "react-dimensions";

// Components
import Timeline from "./Timeline";

// Helpers and constansts
import { zip, daydiff, cummulativeSeperation } from "../helpers";
import Constants from "../Constants";

import { Button as ControlButton } from "./styled/ControlBar";
import {
  DefaultBackButtonContent,
  DefaultForwardButtonContent,
} from "./ControlButtonContent";
import StyledEventsBar from "./styled/EventsBar";
import StyledEventLine from "./styled/EventLine";
import EventDot from "./EventDot";

/**
 * Default method to convert a date to a string label
 * @param {string} date The string representation of a date
 * @return {string} The formatted date string
 */
const defaultGetLabel = (date, index) =>
  new Date(date).toDateString().substring(4);

export const defaultStyles = {
  outline: "#dfdfdf",
  background: "#f8f8f8",
  foreground: "#7b9d6f",
  label: "#333",
};

export const defaultFillingMotion = {
  stiffness: 150,
  damping: 25,
};
export const defaultSlidingMotion = {
  stiffness: 150,
  damping: 25,
};
/*
 * This is the Horizontal Timeline. This component expects an array of dates
 * just as strings (e.g. 1993-01-01) and layes them horizontaly on the the screen
 * also expects a callback which is activated when that particular index is
 * clicked passing that index along
 *
 * The values that the properties will take if they are not provided
 * by the user.
 * @type {Object}
 */
const HorizontalTimeline = React.forwardRef (({
  values = [],
  index = 0,
  indexClick = () => null,
  getLabel = defaultGetLabel,
  minEventPadding = Constants.MIN_EVENT_PADDING,
  maxEventPadding = Constants.MAX_EVENT_PADDING,
  linePadding = Constants.TIMELINE_PADDING,
  labelWidth = Constants.DATE_WIDTH,
  styles = defaultStyles,
  fillingMotion = defaultFillingMotion,
  slidingMotion = defaultSlidingMotion,
  isOpenEnding = true,
  isOpenBeginning = true,
  isTouchEnabled = true,
  isKeyboardEnabled = true,
  containerWidth = 0,
  containerHeight = 0,

  isControlBarEnabled = true,
  isBackFaderEnabled = true,
  isForwardFaderEnabled = true,
  isBackEnabled = true,
  isForwardEnabled = true,
  isControlButtonEnabled = true,
  controlButtonComponent = ControlButton,
  backButtonContent = DefaultBackButtonContent,
  forwardButtonContent = DefaultForwardButtonContent,
  
  dotComponent = EventDot,
  lineComponent = StyledEventLine,
  barComponent = StyledEventsBar,

  ...rest
}, ref) => {
  if (!containerWidth) {
    //As long as we do not know the width of our container, do not render anything!
    return false;
  }

  // Convert the date strings to actual date objects
  const dates = values.map((value) => new Date(value));
  // Calculate the distances for all events
  const distances = cummulativeSeperation(
    dates,
    labelWidth,
    minEventPadding,
    maxEventPadding,
    linePadding
  );

  // Convert the distances and dates to events
  const events = distances.map((distance, index) => ({
    distance,
    label: getLabel(values[index], index),
    date: values[index],
  }));

  const visibleWidth = containerWidth - 80;

  const totalWidth = Math.max(
    events[events.length - 1].distance + linePadding,
    visibleWidth
  );

  let barPaddingRight = 0;
  let barPaddingLeft = 0;
  if (!isOpenEnding) {
    barPaddingRight = totalWidth - events[events.length - 1].distance;
  }
  if (!isOpenBeginning) {
    barPaddingLeft = events[0].distance;
  }

  return (
    <Timeline
      ref={ref}
      width={containerWidth}
      height={containerHeight}
      events={events}
      isTouchEnabled={isTouchEnabled}
      totalWidth={totalWidth}
      visibleWidth={visibleWidth}
      index={index}
      styles={styles}
      indexClick={indexClick}
      labelWidth={labelWidth}
      fillingMotion={fillingMotion}
      barPaddingRight={barPaddingRight}
      barPaddingLeft={barPaddingLeft}
      isBackFaderEnabled={isBackFaderEnabled}
      isForwardFaderEnabled={isForwardFaderEnabled}
      isBackEnabled={isBackEnabled}
      isForwardEnabled={isForwardEnabled}
      
      isControlBarEnabled={isControlBarEnabled}
      controlButtonComponent={controlButtonComponent}
      backButtonContent={backButtonContent}
      forwardButtonContent={forwardButtonContent}
      dotComponent={dotComponent}
      lineComponent={lineComponent}
      barComponent={barComponent}
    />
  );
});

/**
 * The expected properties from the parent
 * @type {Object}
 */
HorizontalTimeline.propTypes = {
  // --- EVENTS ---
  // Selected index
  index: PropTypes.number,
  // Array containing the sorted date strings
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Function that takes the index of the array as argument
  indexClick: PropTypes.func,
  // Function to calculate the label based on the date string
  getLabel: PropTypes.func,
  // --- POSITIONING ---
  // the minimum padding between events
  minEventPadding: PropTypes.number,
  // The maximum padding between events
  maxEventPadding: PropTypes.number,
  // Padding at the front and back of the line
  linePadding: PropTypes.number,
  // The width of the label
  labelWidth: PropTypes.number,
  // --- STYLING ---
  styles: PropTypes.object,
  fillingMotion: PropTypes.object,
  slidingMotion: PropTypes.object,
  isOpenEnding: PropTypes.bool,
  isOpenBeginning: PropTypes.bool,
  // --- INTERACTION ---
  isTouchEnabled: PropTypes.bool,
  isKeyboardEnabled: PropTypes.bool,

  isBackFaderEnabled: PropTypes.bool,
  isForwardFaderEnabled: PropTypes.bool,

  isBackEnabled: PropTypes.bool,
  isForwardEnabled: PropTypes.bool,
  isControlBarEnabled: PropTypes.bool,
  controlButtonComponent: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
  backButtonContent: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
  forwardButtonContent: PropTypes.oneOf([PropTypes.object, PropTypes.func]),

  dotComponent: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
  lineComponent: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
  barComponent: PropTypes.oneOf([PropTypes.object, PropTypes.func]),
};

export default Dimensions({ elementResize: true })(HorizontalTimeline);
