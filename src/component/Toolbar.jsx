import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNode, clearError } from '../redux/store/fileSystemSlice'


export default function Toolbar() {
    const dispatch = useDispatch()
    const error = useSelector(s => s.fs.error)


    return (
        <div className="flex items-center gap-2 p-2 border-b">
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => {
                const type = prompt('Create folder or file? (enter folder/file)')
                if (type === 'folder' || type === 'file') {
                    const name = prompt('Name:')
                    if (name) dispatch(createNode({ parentId: 'root', name, type }))
                }
            }}>New</button>
            {error && <div className="text-red-600">{error} <button onClick={() => dispatch(clearError())}>x</button></div>}
        </div>
    )
}