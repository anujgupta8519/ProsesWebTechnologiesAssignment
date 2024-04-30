import React from 'react'
import { getAllClients } from '../../services/admin.services'
import ClientData from '../../components/ShowData/ClientData'

function ClientsData() {
    const [clients,setClients] = React.useState([])
    const [loading,setLoading] = React.useState(true)

    React.useEffect(() => {
        getAllClients().then((res) => {
            setClients(res.data);
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }, [])



  return (
loading ? <div>Loading</div> : <div>
{clients?.map((client) => {
    return <ClientData key={client._id} data={client} />
})}
</div>
  )
}

export default ClientsData