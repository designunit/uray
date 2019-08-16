import * as React from 'react'
import { Tree } from 'antd'
import { treeCaseData } from '../../app'

const { TreeNode } = Tree

const renderTreeNodes = data => data.map(item => {
    if (item.children) {
        return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
                {renderTreeNodes(item.children)}
            </TreeNode>
        );
    }
    return <TreeNode {...item} />
});

export interface ICaseTreeProps {
    disabled?: boolean
    checkedKeys: string[]
    onCheck: (checkedKeys: string[]) => void
    style?: React.CSSProperties
}

export const CaseTree: React.FC<ICaseTreeProps> = props => {
    const [expandedKeys, setExpandedKeys] = React.useState([])
    const [tree, setTree] = React.useState(treeCaseData())

    return (
        <Tree
            disabled={props.disabled}
            style={props.style}
            checkable
            onExpand={setExpandedKeys}
            expandedKeys={expandedKeys}
            autoExpandParent={false}
            onCheck={props.onCheck}
            checkedKeys={props.checkedKeys}
            // onSelect={this.onSelect}
            // selectedKeys={this.state.selectedKeys}
            selectedKeys={[]}
        >
            {renderTreeNodes(tree)}
        </Tree>
    )
}
