import React , {useContext} from 'react';
import { store } from '../Table/contact';


const DeleteSuccess = () => {
  const [popup, setpopup]=useContext(store)
    return (popup === 4) ? (
    <div className='Delete-many' onClick={()=>setpopup(0)}>
    <div>
        <p><i className='material-icons delete-icon'>done</i></p>
        <h3>Deleted Contacts</h3>
    </div>
</div>
  ):""
}

export default DeleteSuccess
