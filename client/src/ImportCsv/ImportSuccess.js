import React ,{useContext} from 'react'
import { store } from '../Table/contact'

const ImportSuccess = () => {
  const[popup, setpopup] = useContext(store)
    return (popup === 2)?(<div className="csv-file success" onClick={()=>setpopup(0)}>
    <div className='upload_file_container'>
      <p className='upload_success'><i className="material-icons">done</i></p>
      <h3>Import Complete</h3>
      <p className='drop'>CSV File is Uploaded</p>
    </div>
    </div>
  ):""
}

export default ImportSuccess
