import styled, { css } from "styled-components";
import Color from "color";

/**
 * Returns the styles that generate a fading effect on the edges of the timeline
 *
 * @param  {string} position The position of the fader. Can only be left or right
 * @param  {string} gradientDirection The direction in which we want to generate fade effect
 * @param  {object} styles The styles (user-definded/default).Mainly Information about the background, foreground, etc.
 * @return {string} Formatted styles
 */
export const getListItemDirectionStyle = (
  position = "left",
  gradientDirection = "right",
  styles = { background: "#fff" }
) => css`
  ${position}: 0px;
  background-image: linear-gradient(
    to ${gradientDirection},
    ${styles.background},
    ${Color(styles.background).alpha(0).rgb()}
  );
`;

const StyledFader = styled.div`
  top: 50%;
  position: absolute;
  bottom: auto;
  transform: translateY(-50%);
  height: 100%;
  width: 20px;
  overflow: hidden;

  ${({left, styles}) =>
    left && getListItemDirectionStyle("left", "right", styles)}
  ${({right, styles}) =>
    right && getListItemDirectionStyle("right", "left", styles)}
`;

export default StyledFader;
