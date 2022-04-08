const divStyle = { margin: '10px'}

const Section = ({children}) => {

    return(
        <div style={divStyle}>
            {children}
        </div>
    );
};

export default Section;