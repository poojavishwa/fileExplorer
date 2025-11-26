export default function Modal({open,title,children,onClose}){
    if(!open) return null
    return(
        <div className="fixed inset-0 bg-black/40 flex item-center justify-centerz-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-4">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-600">X</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}