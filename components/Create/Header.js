import {Container, Segment} from "semantic-ui-react"

const Header = ({action}) => {
    return(
        <Container style={{marginTop:"2rem", marginBottom:"2rem"}}>
            <Segment piled={true} color="grey">
                <h1 style={{textAlign:"center"}}>{action} tu publicación</h1>
            </Segment>
        </Container>
    )
}

export default Header