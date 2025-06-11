export const Footer = () => {
    const footerStyle = {
        color: 'lightblue',
        fontStyle: 'italic',
        fontSize: '12px',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        padding: '10px',
        marginTop: '20px'
    }

    return (
        <div style={footerStyle}>
            <br />
            <p>
                Note app, Department of Computer Science, University of Helsinki 2025
            </p>
        </div>
    )
}

export default Footer