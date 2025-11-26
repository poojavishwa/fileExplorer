import { createSlice } from '@reduxjs/toolkit'
import mock from '../../data/mockFileSystem.json'
import { v4 as uuidv4 } from 'uuid'
import { findNodeById, addNode, removeNode, renameNode } from '../../utils/fsHelpers'


const initialState = {
    tree: mock,
    selectedFileId: null,
    expanded: { root: true },
    error: null,
}


const slice = createSlice({
    name: 'fileSystem',
    initialState,
    reducers: {
        toggleExpand(state, action) {
            const id = action.payload
            state.expanded[id] = !state.expanded[id]
        },
        selectFile(state, action) {
            state.selectedFileId = action.payload
            state.error = null
        },
        createNode(state, action) {
            const { parentId, name, type } = action.payload
            if (!name || name.trim() === '') { state.error = 'Name cannot be empty.'; return }
            const parent = findNodeById(state.tree, parentId)
            if (!parent || parent.type !== 'folder') { state.error = 'Parent folder not found.'; return }
            // name uniqueness check
            const exists = (parent.children || []).some(c => c.name === name)
            if (exists) { state.error = 'An item with the same name already exists.'; return }
            const newNode = { id: uuidv4(), name, type, ...(type === 'file' ? { content: '' } : { children: [] }) }
            addNode(state.tree, parentId, newNode)
            state.error = null
            state.expanded[parentId] = true
        },
        deleteNode(state, action) {
            const id = action.payload
            if (id === 'root') { state.error = 'Cannot delete root.'; return }
            const removed = removeNode(state.tree, id)
            if (!removed) { state.error = 'Item not found.'; return }
            if (state.selectedFileId === id) state.selectedFileId = null
            state.error = null
        },
        renameNode(state, action) {
            const { id, newName } = action.payload
            if (!newName || newName.trim() === '') { state.error = 'Name cannot be empty.'; return }
            const res = renameNode(state.tree, id, newName)
            state.error = res ? null : 'Rename failed or name conflict.'
        },
        updateFileContent(state, action) {
            const { id, content } = action.payload
            const node = findNodeById(state.tree, id)
            if (!node || node.type !== 'file') { state.error = 'File not found.'; return }
            node.content = content
            state.error = null
        },
        clearError(state) { state.error = null }
    }
})


export const { toggleExpand, selectFile, createNode, deleteNode, renameNode: rename, updateFileContent, clearError } = slice.actions
export default slice.reducer