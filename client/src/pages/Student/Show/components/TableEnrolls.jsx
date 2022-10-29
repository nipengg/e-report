import React from 'react'
import Table from 'react-bootstrap/Table';

const TableEnrolls = () => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Course</th>
                        <th>Scores</th>
                        <th>Lecturer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Algorithm</td>
                        <td>LA20</td>
                        <td>Wina Permata Sari</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Program Design Method</td>
                        <td>LA20</td>
                        <td>Sidharta</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Calculus</td>
                        <td>LA20</td>
                        <td>Aldiki</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default TableEnrolls