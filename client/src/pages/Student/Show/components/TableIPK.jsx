import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { CDBSpinner } from 'cdbreact'
import axios from 'axios';
import Chart from 'chart.js/auto';

const TableIPK = ({ nim, token }) => {
  const url = 'http://localhost:3000/'

  const [ipk, setIpk] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    try {
      const response = await axios.get(`${url}ipk/semester?nim=${nim}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setIpk(response.data.data)
      setLoading(false)
      console.log(ipk)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading === true ? <div style={{ textAlign: 'center', paddingTop: 100 }}><CDBSpinner dark /></div> :
        <>
          <div style={{ textAlign: 'center' }}>
            <h2 className="mt-5" >IPK</h2>
            <h4>Average IPK: 3.45</h4>
          </div>
          <Bar data={{
            labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
            datasets: [
              {
                label: 'IPK Semester',
                backgroundColor: 'rgba(194, 116, 161, 0.5)',
                borderColor: 'rgb(194, 116, 161)',
                data: ipk
              }
            ],
          }} options={{ responsive: true }} />
        </>}

    </>

  );
};

export default TableIPK;