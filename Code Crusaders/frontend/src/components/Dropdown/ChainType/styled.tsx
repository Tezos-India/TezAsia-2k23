import styled from 'styled-components'

export const ChainTypePanel = styled.div`
  width: 130px;
  height: 74px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  position: -webkit-fixed;
  z-index: 1000;
  color: #000000;

  a {
    color: #000000;
    width: 100%;
    text-transform: capitalize;
  }
  a:hover {
    color: #000000;
  }

  left: ${(props: { left: number; top: number }) => props.left}px;
  top: ${(props: { left: number; top: number }) => props.top}px;

  .chain__type__selected {
    width: 94%;
    font-size: 12px;
    font-weight: normal;
    height: 33px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    margin: 3px 3% 0 3%;
    padding: 0 3%;
    cursor: pointer;
    border-radius: 3px;
    white-space: nowrap;
    display: flex;
    align-items: center;

    &:hover {
      background: #f1f1f1;
    }
  }
  .chain__type__normal {
    width: 94%;
    font-size: 14px;
    font-weight: normal;
    height: 33px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    margin: 0px 3% 3px 3%;
    padding: 0 3%;
    cursor: pointer;
    border-radius: 3px;
    display: flex;
    align-items: center;

    &:hover {
      background: #f1f1f1;
    }
  }

  .chain__type__separate {
    width: 88%;
    height: 0.5px;
    border: solid 0.5px #c3c3c3;
    margin: 0 6%;
  }
`
