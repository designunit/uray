import * as React from 'react'

import { Tree } from 'antd'

const { TreeNode } = Tree

function renderTreeNodes<T>(data: Array<ITreeNode<T>>) {
    return data.map(item => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {renderTreeNodes(item.children)}
                </TreeNode>
            )
        }
        return <TreeNode {...item} />
    })
}

export interface ITreeNode<T> {
    children: Array<ITreeNode<T>>
    field: string
    key: string
    title: string
    value: T
}

export interface IFeatureFilterProps<T> {
    disabled?: boolean
    options: { tree: Array<ITreeNode<T>> }
    checkedKeys: string[]
    onCheck: (checkedKeys: string[]) => void
    style?: React.CSSProperties
}

export function FeatureFilter<T>(props: IFeatureFilterProps<T>) {
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
