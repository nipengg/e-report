import React from 'react'
import Badge from 'react-bootstrap/esm/Badge';

const RenderGrade = ({value}) => {
    switch(true){
        case (value == null):
            return <td style={{textAlign:"center"}}><h4><Badge bg="danger">-</Badge></h4></td>;

        case (value >= 90):
            return <td style={{textAlign:"center"}}><h4><Badge bg="success">A</Badge></h4></td>;

        case (value >= 80):
            return <td style={{textAlign:"center"}}><h4><Badge bg="primary">B</Badge></h4></td>;

        case (value >= 75):
            return <td style={{textAlign:"center"}}><h4><Badge bg="secondary">C</Badge></h4></td>;
        
        case (value >= 70):
            return <td style={{textAlign:"center"}}><h4><Badge bg="warning">D</Badge></h4></td>;

        case (value < 70):
            return <td style={{textAlign:"center"}}><h4><Badge bg="danger">F</Badge></h4></td>;
            
        default:
            return <></>
            
    }
} 
export default RenderGrade;