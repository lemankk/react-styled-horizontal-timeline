import React from 'react';
import PropTypes from 'prop-types';

import { cummulativeSeperation } from '../helpers';
import EventsBarContainer from "./styled/EventsBarContainer";
import EventDot from './EventDot';

import { getDotType } from '../helpers';

/**
 * The markup Information for all the events on the horizontal timeline.
 *
 * @param  {object} props The props from parent mainly styles
 * @return {StatelessFunctionalReactComponent} Markup Information for the fader
 */
const EventsBar = ({ events, selectedIndex, styles, handleDateClick, labelWidth, dotComponent: DotComponent }) => (
  <EventsBarContainer
    className="events-bar events-container"
  >
    {events && Array.isArray(events) && events.map((event, index) =>{
      
      return (<DotComponent
        dotType={getDotType(index, selectedIndex)}
        distanceFromOrigin={event.distance}
        label={event.label}
        date={event.date}
        index={index}
        key={index}
        onClick={handleDateClick}
        selected={selectedIndex}
        styles={styles}
        labelWidth={labelWidth}
      />)}
    )}
  </EventsBarContainer>
);

/**
 * The styles that parent will provide
 * @type {Object}
 */
EventsBar.propTypes = {
  // Array containing the events
  events: PropTypes.arrayOf(PropTypes.shape({
    distance: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  // The index of the selected event
  selectedIndex: PropTypes.number,
  // a handler for clicks on a datapoint
  handleDateClick: PropTypes.func,
  // The width you want the labels to be
  labelWidth: PropTypes.number.isRequired,
  // Custom styling
  styles: PropTypes.object,
}


export default EventsBar;
