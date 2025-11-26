import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNode, deleteNode, selectFile, toggleExpand } from '../redux/store/fileSystemSlice'

function Icon({ node }) {
    if (node.type === "folder") return <span>📁</span>
    return <span>📄</span>
}

export default function FileNode({ node, level = 0 }) {
    const dispatch = useDispatch()
    const expanded = useSelector(s => s.fs.expanded[node.id])
    const selectedId = useSelector(s => s.fs.selectedFileId)
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState(node.name)


    const padding = { paddingLeft: 8 + level * 12 }


    function onToggle(e) {
        e.stopPropagation()
        if (node.type === 'folder') dispatch(toggleExpand(node.id))
    }


    function onSelect(e) {
        e.stopPropagation()
        if (node.type === 'file') dispatch(selectFile(node.id))
    }


    function handleCreate(type) {
        const newName = prompt(`Enter ${type} name`)
        if (newName) dispatch(createNode({ parentId: node.id, name: newName, type }))
    }


    function handleDelete(e) {
        e.stopPropagation()
        if (confirm(`Delete ${node.name}?`)) dispatch(deleteNode(node.id))
    }


    function handleRename(e) {
        e.stopPropagation()
        const newName = prompt('New name', node.name)
        if (newName) dispatch(rename({ id: node.id, newName }))
    }


    return (
        <div>
            <div className={`flex items-center justify-between file-node rounded p-1 ${selectedId === node.id ? 'bg-blue-50' : ''}`} style={padding} onClick={node.type === 'folder' ? onToggle : onSelect}>
                <div className="flex items-center gap-2">
                    <button onClick={onToggle} className="w-5 h-5 flex items-center justify-center">{node.type === 'folder' ? (expanded ? '▾' : '▸') : ''}</button>
                    <Icon node={node} />
                    <div className="truncate max-w-[220px]">{node.name}</div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                    {node.type === 'folder' && <button title="New Folder" onClick={(e) => { e.stopPropagation(); handleCreate('folder') }}>📂+</button>}
                    {node.type === 'folder' && <button title="New File" onClick={(e) => { e.stopPropagation(); handleCreate('file') }}>📄+</button>}
                    <button title="Rename" onClick={handleRename}>✎</button>
                    <button title="Delete" onClick={handleDelete}>🗑</button>
                </div>
            </div>


            {node.children && expanded && (
                <div>
                    {node.children.map(child => (
                        <FileNode key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}