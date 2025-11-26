import FileTree from "./FileTree";

export default function Sidebar({className}){
    return (
        <aside className={`bg-gray-50 border-r ${className}`} style={{minWidth:260}}>
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold"> Explorer</h2>
            </div>
            <div className="p-3 overflow-auto h-[calc(100vh-64px)]">
                <FileTree/>
            </div>
        </aside>
    )
}