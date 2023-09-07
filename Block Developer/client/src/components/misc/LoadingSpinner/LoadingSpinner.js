import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './LoadingSpinner.css';
import {Spinner} from 'react-bootstrap'



const Backdrop = (props) => {
  return <div className="backdrop"/>;
};


const portalElement = document.getElementById('overlays');
const LoadingSpinner = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop/>, portalElement)}
      {ReactDOM.createPortal(
        <Spinner animation="border" role="status" className="loading" variant="primary">
  <span className="visually-hidden">Loading...</span>
</Spinner>,
        portalElement
      )}
    </Fragment>
  );

};



export default LoadingSpinner;

