export function findNodeById(node, id) {
    if (!node) return null
    if (node.id === id) return node
    if (node.children) {
        for (const c of node.children) {
            const found = findNodeById(c, id)
            if (found) return found
        }
    }
    return null
}


export function addNode(root, parentId, newNode) {
    const parent = findNodeById(root, parentId)
    if (!parent) return false
    parent.children = parent.children || []
    parent.children.push(newNode)
    return true
}


export function removeNode(root, id) {
    if (!root || !root.children) return false
    const idx = root.children.findIndex(c => c.id === id)
    if (idx !== -1) { root.children.splice(idx, 1); return true }
    for (const child of root.children) {
        const removed = removeNode(child, id)
        if (removed) return true
    }
    return false
}


export function renameNode(root, id, newName) {
    const node = findNodeById(root, id)
    if (!node) return false
    // check sibling conflict
    const parent = findParent(root, id)
    if (parent) {
        if ((parent.children || []).some(c => c.name === newName && c.id !== id)) return false
    }
    node.name = newName
    return true
}


function findParent(root, id, parent = null) {
    if (!root) return null
    if (root.id === id) return parent
    if (root.children) {
        for (const c of root.children) {
            const res = findParent(c, id, root)
            if (res) return res
        }
    }
    return null
}