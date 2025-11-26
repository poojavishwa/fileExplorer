import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFileContent } from "../redux/store/fileSystemSlice"


export default function FileContent() {
    const selectedId = useSelector(s => s.fs.selectedFileId)
    const tree = useSelector(s => s.fs.tree)
    const error = useSelector(s => s.fs.error)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [name, setName] = useState('')


    useEffect(() => {
        function find(node, id) {
            if (!node) return null
            if (node.id === id) return node
            if (node.children) {
                for (const c of node.children) {
                    const res = find(c, id)
                    if (res) return res
                }
            }
            return null
        }
        const node = find(tree, selectedId)
        if (node && node.type === 'file') {
            setContent(node.content || '')
            setName(node.name)
        } else {
            setContent('')
            setName('')
        }
    }, [selectedId, tree])


    function save() {
        if (!selectedId) return
        dispatch(updateFileContent({ id: selectedId, content }))
    }


    return (
        <div className="p-4 h-full flex flex-col">
            {error && <div className="text-red-700 mb-2">{error}</div>}
            {!selectedId ? (
                <div className="text-gray-500">Select a file to view</div>
            ) : (
                <>
                    <div className="mb-3">
                        <div className="text-sm text-gray-600">{name}</div>
                    </div>
                    <textarea className="flex-1 p-2 border rounded resize-none" value={content} onChange={e => setContent(e.target.value)} />
                    <div className="mt-2 flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={save}>Save</button>
                    </div>
                </>
            )}
        </div>
    )
}