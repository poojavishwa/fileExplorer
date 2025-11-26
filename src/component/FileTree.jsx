import { useSelector } from "react-redux";
import FileNode from "./FileNode";

export  default function FileTree(){
    const tree =useSelector(s=>s.fs.tree)
    return (
        <div>
            <FileNode node ={tree} level={0}/>
        </div>
    )
}
