import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) =>{
    return(
        ReactDOM.createPortal( 
        <div onClick={props.onCancle} className="modal-container">
            <div onClick={(e)=> e.stopPropagation() } className="modal-body">
                <div className="modal-header">
                    {props.title}
                </div>
                <div className="modal-content">
                    {props.content}
                </div>
                <div className="modal-actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.getElementById('portal') )
    );
}

export default Modal;