import styled from "styled-components/macro";

export const ReoccuringContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto 48px;
  grid-template-areas: "reoccuring-content reoccuring-slider";
  overflow-y: hidden;
`;

export const ReoccuringContent = styled.div`
  grid-area: reoccuring-content;
  overflow-y: hidden;
  padding: 1rem 0.5rem;
  section {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    max-height: 50vh;
    height: 100%;
    padding: 1rem 0.5rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    overflow-y: scroll;
    div {
      display: flex;
      flex-basis: auto;
      flex-shrink: 0;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      p {
        text-align: start;
        font-family: Raleway, sans-serif;
        span.green {
          color: ${(props) => props.theme.colors.cashgreen};
        }
      }
    }
    p:first-child {
      flex-grow: 1;
      font-size: 0.75rem;
      padding: 0 0.5rem;
    }
    p:last-child {
      min-width: 4rem;
      font-size: 0.75rem;
      text-align: end;
    }
  }
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ReoccuringSlider = styled.div`
  grid-area: reoccuring-slider;
  max-height: 80vh;
  overflow-y: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 1px solid rgba(255, 255, 255, 0.15);

  overflow-y: hidden;
`;

export const ViewButton = styled.button`
  opacity: 0.5;
  border: 1px solid white;
  border-radius: 15px;
  padding: 0.5rem;
  color: white;
  transition: all ease-in-out 0.3s;
  &.active {
    opacity: 1;
    transition: all ease-in-out 0.3s;
  }
`;

export const VerticalSlider = styled.input<{ innerHeight: number }>`
  -webkit-appearance: none;
  width: ${(props) => `calc(${props.innerHeight}px - 20rem)`};
  height: 10px;
  padding: 0 5px;
  transform: rotate(90deg);
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  opacity: 0.7;
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.3; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    opacity: 1;
    width: 32px; /* Set a specific slider handle width */
    height: 32px; /* Slider handle height */
    border-radius: 16px;
    background: ${(props) => props.theme.colors.softblue};
    cursor: pointer; /* Cursor on hover */
  }
`;

interface CountSpanProps {
  count: number;
}
export const CountSpan = styled.span<CountSpanProps>`
  color: ${(props) => props.theme.colors.cashgreen};
`;

export const GroupedTransactionRow = styled.div`
  position: relative;

  i.special {
    position: absolute;
    left: 0.5rem;
    font-size: 0.75rem;
    bottom: 0.5rem;
    color: ${(props) => props.theme.colors.cashgreen};
  }
`;

export const LegendSpan = styled.span`
  color: ${(props) => props.theme.colors.cashgreen};
  font-size: 0.75rem;
  font-family: Raleway, sans-serif;
`;
