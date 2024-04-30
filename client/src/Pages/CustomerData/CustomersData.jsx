import React from 'react'
import { getAllCustomers } from '../../services/client.services'
import CustomerData from '../../components/ShowData/CustomerData'

function CustomersData() {
    const [customers,setCustomers] = React.useState([])
    const [loading,setLoading] = React.useState(true)

    React.useEffect(() => {
        getAllCustomers().then((res) => {
            setCustomers(res.data);
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }, [])



  return (
    loading ? <h1>Loading</h1> :
    <div>
    {customers?.map((customer) => {
        return <CustomerData key={customer._id} data={customer} />
    })}
    </div>
  )
}

export default CustomersData