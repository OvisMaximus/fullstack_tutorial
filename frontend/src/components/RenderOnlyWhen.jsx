const RenderOnlyWhen = ({ condition, children }) => {
    return condition ? children : ''
}
export default RenderOnlyWhen
