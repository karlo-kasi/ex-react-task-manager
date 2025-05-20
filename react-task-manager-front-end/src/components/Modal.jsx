import ReactDOM from "react-dom"

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {

    if (!show) {
        return null
    }

    return ReactDOM.createPortal(

        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        {content}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Chiudi</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );

}