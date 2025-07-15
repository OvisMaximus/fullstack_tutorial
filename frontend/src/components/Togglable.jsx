import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const { children, showButtonLabel, hideButtonLabel} = props
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    useImperativeHandle(refs, () => {
        return {toggleVisibility}
    })

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{showButtonLabel}</button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {children}
                <button onClick={toggleVisibility}>{hideButtonLabel}</button>
            </div>
        </div>
    )
})
Togglable.displayName = 'Togglable'

export default Togglable