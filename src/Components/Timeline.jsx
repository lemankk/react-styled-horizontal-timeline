import React from "react";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";
import styled from "styled-components";

import EventsBar from "./EventsBar";
import EventLine from "./EventLine";

import Constants from "../Constants";

import Container from "./styled/Container";
import Wrapper from "./styled/TimelineWrapper";
import Bar from "./styled/EventsBar";
import { ControlBar } from "./styled/ControlBar";
import Fader from "./styled/Fader";

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      maxPosition: Math.min(props.visibleWidth - props.totalWidth, 0),
    };

    this.touch = {
      coors: {
        x: 0,
        y: 0,
      },
      isSwiping: false,
      started: false,
      threshold: 3,
    };
  }

  componentWillMount() {
    document.body.addEventListener("keydown", this.handleKeydown);
  }

  componentDidMount() {
    const { props } = this;
    const selectedEvent = props.events[props.index];
    this.slideToPosition(
      -(selectedEvent.distance - props.visibleWidth / 2),
      this.props
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (event) => {
    const { props } = this;
    if (props.isKeyboardEnabled) {
      if (
        event.keyCode === Constants.LEFT_KEY ||
        event.keyCode === Constants.RIGHT_KEY
      ) {
        this.updateSlide(Constants.KEYMAP[event.keyCode]);
      } else if (event.keyCode === Constants.UP_KEY) {
        props.indexClick(
          Math.min(props.selectedIndex + 1, props.events.length - 1)
        );
      } else if (event.keyCode === Constants.DOWN_KEY) {
        props.indexClick(Math.max(props.selectedIndex - 1, 0));
      }
    }
  };

  handleTouchStart = (event) => {
    const touchObj = event.touches[0];

    this.touch.coors.x = touchObj.pageX;
    this.touch.coors.y = touchObj.pageY;
    this.touch.isSwiping = false;
    this.touch.started = true;
  };

  handleTouchMove = (event) => {
    if (!this.touch.started) {
      this.handleTouchStart(event);
      return;
    }

    const touchObj = event.touches[0];
    const dx = Math.abs(this.touch.coors.x - touchObj.pageX);
    const dy = Math.abs(this.touch.coors.y - touchObj.pageY);

    const isSwiping = dx > dy && dx > this.touch.threshold;

    if (
      isSwiping === true ||
      dx > this.touch.threshold ||
      dy > this.touch.threshold
    ) {
      this.touch.isSwiping = isSwiping;
      const dX = this.touch.coors.x - touchObj.pageX; // amount scrolled
      this.touch.coors.x = touchObj.pageX;
      this.setState({
        position: this.state.position - dX, // set new position
      });
    }
    if (this.touch.isSwiping !== true) {
      return;
    }
    // Prevent native scrolling
    event.preventDefault();
  };

  handleTouchEnd = (event) => {
    // Make sure we are scrolled to a valid position
    this.slideToPosition(this.state.position);
    this.touch.coors.x = 0;
    this.touch.coors.y = 0;
    this.touch.isSwiping = false;
    this.touch.started = false;
  };

  componentWillReceiveProps(props) {
    const selectedEvent = props.events[props.index];
    const minVisible = -this.state.position; // Position is always negative!
    const maxVisible = minVisible + props.visibleWidth;

    if (
      selectedEvent.distance > minVisible + 10 &&
      selectedEvent.distance < maxVisible - 10
    ) {
      //Make sure we are not outside the view
      this.slideToPosition(this.state.position, props);
    } else {
      //Try to center the selected index
      this.slideToPosition(
        -(selectedEvent.distance - props.visibleWidth / 2),
        props
      );
    }
  }

  /**
   * Slide the timeline to a specific position. This method wil automatically cap at 0 and the maximum possible position
   * @param {number} position: The position you want to slide to
   * @return {undefined} Modifies the value by which we translate the events bar
   */
  slideToPosition = (position, props = this.props) => {
    // the width of the timeline component between the two buttons (prev and next)
    const maxPosition = Math.min(props.visibleWidth - props.totalWidth, 0); // NEVER scroll to the right

    this.setState({
      position: Math.max(Math.min(0, position), maxPosition),
      maxPosition,
    });
  };

  /**
   * This method translates the timeline by a certaing amount depending on if the direction passed
   * is left or right.
   *
   * @param {string} direction The direction towards which the timeline will translates
   * @param {object} the props to use during this calcuation
   * @return {undefined} Just modifies the value by which we need to translate the events bar in place
   */
  updateSlide = (direction, props = this.props) => {
    //  translate the timeline to the left('next')/right('prev')
    if (direction === Constants.RIGHT) {
      this.slideToPosition(
        this.state.position - props.visibleWidth + props.labelWidth,
        props
      );
    } else if (direction === Constants.LEFT) {
      this.slideToPosition(
        this.state.position + props.visibleWidth - props.labelWidth,
        props
      );
    }
  };

  centerEvent = (index, props = this.props) => {
    const event = props.events[index];

    this.slideToPosition(-event.distance);
  };

  render() {
    const { state, props } = this;

    const {
      barComponent: BarComponent,
      lineComponent: LineComponent,
      controlButtonComponent: ControlButton,
      backButtonContent: BackButtonContent,
      forwardButtonContent: ForwardButtonContent,
    } = props;

    //  creating an array of list items that have an onClick handler into which
    //  passing the index of the clicked entity.
    // NOTE: Improve timeline dates handeling and eventsMinLapse handling
    const touchEvents = props.isTouchEnabled
      ? {
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd,
        }
      : {};

    // filled value = distane from origin to the selected event
    const filledValue =
      props.events[props.index].distance - props.barPaddingLeft;
    const eventLineWidth =
      props.totalWidth - props.barPaddingLeft - props.barPaddingRight;

    const buttonBackEnabled = Math.round(state.position) < 0;
    const buttonForwardEnabled =
      Math.round(state.position) > Math.round(state.maxPosition);

    return (
      <Container width={props.width} height={props.height} {...touchEvents}>
      {props.isControlBarEnabled && props.isBackEnabled && (
        <ControlBar
          styles={props.styles}
          type={"back"}
          active={buttonBackEnabled}
          className={`button-back ${
            buttonBackEnabled ? "enabled" : "disabled"
          }`}
          key={Constants.LEFT}
        >
          <ControlButton
            active={buttonBackEnabled}
            styles={props.styles}
            onClick={() => this.updateSlide(Constants.LEFT)}
          >
            <BackButtonContent
              styles={props.styles}
              active={buttonBackEnabled}
            />
          </ControlButton>
        </ControlBar>
      )}
        <Wrapper className="events-wrapper">
          <Motion
            style={{
              X: spring(state.position, this.slidingMotion),
            }}
          >
            {({ X }) => (
              <BarComponent
                width={props.totalWidth}
                left={X}
                className="events"
              >
                <LineComponent
                  type="background"
                  left={props.barPaddingLeft}
                  width={eventLineWidth}
                  fillingMotion={props.fillingMotion}
                  styles={props.styles}
                />
                <LineComponent
                  type="current"
                  left={props.barPaddingLeft}
                  width={filledValue}
                  fillingMotion={props.fillingMotion}
                  styles={props.styles}
                />
                <EventsBar
                  events={props.events}
                  selectedIndex={props.index}
                  styles={props.styles}
                  lineComponent={props.lineComponent}
                  dotComponent={props.dotComponent}
                  handleDateClick={props.indexClick}
                  labelWidth={props.labelWidth}
                />
              </BarComponent>
            )}
          </Motion>

          {props.isBackFaderEnabled && <Fader left styles={props.styles} />}
          {props.isForwardFaderEnabled && <Fader right styles={props.styles} />}
        </Wrapper>
        {props.isControlBarEnabled && props.isForwardEnabled && (
          <ControlBar
            styles={props.styles}
            type={"forward"}
            active={buttonForwardEnabled}
            className={`button-forward ${
              buttonForwardEnabled ? "enabled" : "disabled"
            }`}
            key={Constants.RIGHT}
          >    
            <ControlButton
              active={buttonForwardEnabled}
              styles={props.styles}
              onClick={() => this.updateSlide(Constants.RIGHT)}
            >
              <ForwardButtonContent
                styles={props.styles}
                active={buttonForwardEnabled}
              />
            </ControlButton>
          </ControlBar>
        )}
      </Container>
    );
  }
}

Timeline.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      distance: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  isTouchEnabled: PropTypes.bool.isRequired,
  totalWidth: PropTypes.number.isRequired,
  visibleWidth: PropTypes.number.isRequired,
  index: PropTypes.number,
  styles: PropTypes.object.isRequired,
  indexClick: PropTypes.func.isRequired,
  labelWidth: PropTypes.number.isRequired,
  fillingMotion: PropTypes.object.isRequired,
  barPaddingRight: PropTypes.number.isRequired,
  barPaddingLeft: PropTypes.number.isRequired,
  isControlBarEnabled: PropTypes.bool,
  isBackEnabled: PropTypes.bool,
  isForwardEnabled: PropTypes.bool,
  isBackFaderEnabled: PropTypes.bool,
  isForwardFaderEnabled: PropTypes.bool,
};

export default Timeline;
