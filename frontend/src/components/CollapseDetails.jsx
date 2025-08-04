import { useState } from 'react'
import { Button } from './Button.jsx'
import RenderOnlyWhen from './RenderOnlyWhen.jsx'

const CollapseDetails = ({ summary, children }) => {
    const [collapsed, setCollapsed] = useState(true)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div>
            <span>{summary}</span>
            <Button onClick={toggleCollapsed} text={collapsed? 'show' : 'hide'}/>
            <RenderOnlyWhen condition={!collapsed}>
                <br/>
                {children}
            </RenderOnlyWhen>
        </div>
    )
}
export default CollapseDetails