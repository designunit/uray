import * as React from 'react'

import { Tree } from 'antd'

const { TreeNode } = Tree

const renderTreeNodes = data => data.map(item => {
    if (item.children) {
        return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
                {renderTreeNodes(item.children)}
            </TreeNode>
        )
    }
    return <TreeNode {...item} />
})

export interface IFeatureFilterProps {
    disabled?: boolean
    options: { tree: any }
    checkedKeys: string[]
    onCheck: (checkedKeys: string[]) => void
    style?: React.CSSProperties
}

export const FeatureFilter: React.FC<IFeatureFilterProps> = props => {
    const [expandedKeys, setExpandedKeys] = React.useState([])
    const tree = props.options.tree

    return (
        <Tree
            checkable
            disabled={props.disabled}
            style={props.style}
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
