import styled from 'styled-components'

export const ScriptPanel = styled.div`
  width: 100%;
  margin-top: 8px;
  background-color: #f7f7f7;
  padding: 12px 24px;
  overflow: auto;

  @media (max-width: 750px) {
    margin-top: 5px;
    padding: 6px 12px;
  }
`
export const ScriptItemPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: flex-start;
  margin-bottom: 10px;
  font-size: 16px;

  @media (min-width: 750px) {
    min-height: 20px;
    max-height: 120px;
  }

  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 900px) {
    font-size: 12px;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    font-size: 14px;
  }

  .script__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 130px;

    > span {
      margin-left: 10px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);

      @media (max-width: 750px) {
        margin-left: 5px;
      }
    }
  }

  .script__content {
    flex: 1;
    margin-left: 12px;
    display: flex;
    align-items: center;
    transform: translateY(2px);
    word-wrap: break-word;
    word-break: break-all;
    color: #000000;

    @media (max-width: 750px) {
      margin-left: 5px;
      transform: translateY(0px);
    }
  }

  .script__code_hash {
    display: flex;
    flex-direction: row;
    align-items: center;

    > span {
      margin-right: 12px;
      margin-bottom: 0px;
    }

    @media (max-width: 1440px) {
      flex-direction: column;
      align-items: flex-start;

      > span {
        margin-right: 0px;
        margin-bottom: 6px;
      }
    }
  }
`
