import React from 'react'
import ReactTooltip from 'react-tooltip';


import Sidebar from "./sidebar";
import { useState, createContext, useEffect } from "react";
import "./contact.css";
import ImportCsv from "../ImportCsv/ImportCsv";
import ImportSuccess from "../ImportCsv/ImportSuccess";
import Delete from "../Deleted/Delete";
import DeleteSuccess from "../Deleted/DeleteSuccess";
import axios from "axios";
import Pagination from "./Pagination";

export const store = createContext();

function Contacts() {
  const [popup, setpopup] = useState(0); // for popup
  const [getarr, setGetArr] = useState([]); // for getting data from backend
  const [isChecked, setisChecked] = useState([]); // for deleting the contacts
  
  const [inputText, setInputtext] = useState('');//for filter conditions

  //dropdown work
  const [value, setValue] = useState(""); // for dropdown on search
  
  const onChange = (event) => {
    setInputtext(event.target.value.toLowerCase());
    setValue(event.target.value.toLowerCase());
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };
  //dropdown work

  const showPerPage = 10;
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    const authToken = localStorage.getItem("user");
    axios({
      method: "GET",
      url: "https://contact-manager-server-10x.herokuapp.com/user/",
      headers: {
        authorization: authToken,
      },
    })
      .then((Data) => {
        setGetArr(Data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [popup,value]);

  const deleteAll = (e, id) => {
    let arr = getarr.map((ele) => {
      return ele._id
    })
    setisChecked(arr)
    console.log(e.target.checked)
    let ele = document.getElementById(id);
    let inputElements = ele.getElementsByTagName('input');
    //
    
    for (let i = 0; i < inputElements.length; i++) {
      if (e.target.checked){
        inputElements[i].checked = true;
      }  
      else{
        inputElements[i].checked = false;
        setisChecked([])
      }
       
    }
  }


  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setisChecked([...isChecked, value]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
    console.log("checked", isChecked);
  };

  return (
    <store.Provider value={[popup, setpopup]}>
      <div className="container-5">
        <Sidebar />
        <div className="header">

          {/* dropdown work */}

        <div className="dropdown">
          {getarr
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.email.toLowerCase();

              return (
                searchTerm &&
                fullName.includes(searchTerm) &&
                fullName !== searchTerm
              );
              //  startsWith
            })
            .slice(0,4)
            .map((item) => (
              <div
                onClick={() => onSearch(item.email)}
                className="dropdown-row"
                key={item.email}
              >
                {item.email}
              </div>
            ))}

            {/* dropdown work */}


        </div>
          <div><h3>Total Contacts</h3></div>
          <div className="search">
            🔍
            <input type="search" value={value} placeholder="Search by Email Id...." onChange={onChange}/>
          </div>
          <div className="user-logo">
            <img src="data:image/png;base64,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" alt="img" />
            <div className="user-name">
              <span>Ram Darvin</span>
              <p>Admin</p>
            </div>
          </div>
        </div>
        <ImportCsv getarr={getarr} />
        <ImportSuccess />
        <Delete value={isChecked} /> <DeleteSuccess />
        <div className="contacts">
          <div className="row1">
            <div>
              <span> <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V8H16V18ZM16 6H2V4H16V6ZM6 12H4V10H6V12ZM10 12H8V10H10V12ZM14 12H12V10H14V12ZM6 16H4V14H6V16ZM10 16H8V14H10V16ZM14 16H12V14H14V16Z" fill="black" />
              </svg> Select Date <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_26_3092)">
                    <path d="M16 4.33198L14.59 3L10 7.32659L5.41 3L4 4.33198L10 10L16 4.33198Z" fill="black" />
                  </g>
                  <defs>
                    <filter id="filter0_d_26_3092" x="0" y="0" width="20" height="15" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26_3092" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_26_3092" result="shape" />
                    </filter>
                  </defs>
                </svg></span>
              <span> <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="black" />
              </svg> Filters <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_26_3092)">
                    <path d="M16 4.33198L14.59 3L10 7.32659L5.41 3L4 4.33198L10 10L16 4.33198Z" fill="black" />
                  </g>
                  <defs>
                    <filter id="filter0_d_26_3092" x="0" y="0" width="20" height="15" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26_3092" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_26_3092" result="shape" />
                    </filter>
                  </defs>
                </svg></span>
            </div>
            <div className="contact-nav-right">
              <span>
                <button className="btn" onClick={() => setpopup(3)}>
                  <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7857 5.78055V14.8862H3.21429V5.78055H11.7857ZM10.1786 0.317139H4.82143L3.75 1.22771H0V3.04885H15V1.22771H11.25L10.1786 0.317139ZM13.9286 3.95941H1.07143V14.8862C1.07143 15.8879 2.03571 16.7074 3.21429 16.7074H11.7857C12.9643 16.7074 13.9286 15.8879 13.9286 14.8862V3.95941Z" fill="black" />
                  </svg> Delete
                </button>
              </span>
              <span>
                <button className="btn" onClick={() => setpopup(1)}>
                  <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 0.317139L0 4.30476H3V11.3106H5V4.30476H8L4 0.317139ZM11 14.3188V7.31297H9V14.3188H6L10 18.3064L14 14.3188H11Z" fill="black" />
                  </svg> Import
                </button>
              </span>
              <span><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 11.5854V14.6586H2V11.5854H0V14.6586C0 15.7854 0.9 16.7074 2 16.7074H14C15.1 16.7074 16 15.7854 16 14.6586V11.5854H14ZM3 5.43909L4.41 6.88348L7 4.24055V12.6098H9V4.24055L11.59 6.88348L13 5.43909L8 0.317139L3 5.43909Z" fill="black" />
              </svg> Export</span>
            </div>
          </div>

          <table className="content-table">
            <thead>
              <th><input type="checkbox" value="allselect" id="name" onChange={(e) => deleteAll(e, 'my_body')} /></th>
              <th className="name-get">Name</th>
              <th>| Designation <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 14.225L0 9H10.5L5.25 14.225Z" fill="#605750" />
                <path d="M5.25 9.82285e-05L10.5 5.2251L0 5.2251L5.25 9.82285e-05Z" fill="#605750" />
              </svg></th>
              <th>| Company <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 14.225L0 9H10.5L5.25 14.225Z" fill="#605750" />
                <path d="M5.25 9.82285e-05L10.5 5.2251L0 5.2251L5.25 9.82285e-05Z" fill="#605750" />
              </svg></th>
              <th>| Industry <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 14.225L0 9H10.5L5.25 14.225Z" fill="#605750" />
                <path d="M5.25 9.82285e-05L10.5 5.2251L0 5.2251L5.25 9.82285e-05Z" fill="#605750" />
              </svg></th>
              <th>| Email</th>
              <th>| Phone number</th>
              <th>| Country</th>
              <th>| Action</th>
            </thead>
            <tbody id="my_body">
              {getarr.filter((el) => {
              // if (el.email.toLowerCase()===value) {
                // console.log("yes")
                 return (el.email.toLowerCase().includes(value))
              // }
            }).slice(pagination.start, pagination.end).map((element, i) => {

                  return (
                    <tr key={i} className="row3">
                      <td className="checkbox">
                        <input
                          type="checkbox"
                          value={element._id}
                          checked={element.isChecked}
                          onChange={handleCheckbox}
                        />
                      </td>
                      <td>{element.name}</td>
                      <td>{element.designation}</td>
                      <td>{element.company}</td>
                      <td>{element.industry}</td>
                      <td data-for="tool" data-tip={element.email}>{element.email}</td>
                      <td>{element.phoneNumber}</td>
                      <td>{element.country}</td>
                      <td>
                        <span><svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.24989 17.1249C1.16169 17.1255 1.07438 17.1073 0.993696 17.0717C0.91301 17.0361 0.840777 16.9838 0.781743 16.9183C0.72271 16.8528 0.678213 16.7755 0.651179 16.6915C0.624144 16.6076 0.615185 16.5189 0.624888 16.4312L1.10614 12.0562C1.12327 11.9164 1.18714 11.7864 1.28739 11.6874L11.5124 1.46244C11.6982 1.2763 11.9188 1.12863 12.1617 1.02787C12.4046 0.927108 12.665 0.875244 12.928 0.875244C13.191 0.875244 13.4514 0.927108 13.6943 1.02787C13.9372 1.12863 14.1579 1.2763 14.3436 1.46244L16.2874 3.40619C16.4735 3.59196 16.6212 3.81262 16.722 4.05553C16.8227 4.29844 16.8746 4.55884 16.8746 4.82182C16.8746 5.0848 16.8227 5.3452 16.722 5.58811C16.6212 5.83102 16.4735 6.05167 16.2874 6.23744L6.06864 16.4562C5.96966 16.5564 5.83972 16.6203 5.69989 16.6374L1.32489 17.1187L1.24989 17.1249ZM2.33114 12.4062L1.95614 15.7937L5.34364 15.4187L15.4061 5.35619C15.4761 5.28652 15.5315 5.20372 15.5694 5.11256C15.6072 5.02139 15.6267 4.92365 15.6267 4.82494C15.6267 4.72623 15.6072 4.62849 15.5694 4.53733C15.5315 4.44617 15.4761 4.36337 15.4061 4.29369L13.4561 2.34369C13.3865 2.27377 13.3037 2.2183 13.2125 2.18044C13.1213 2.14259 13.0236 2.1231 12.9249 2.1231C12.8262 2.1231 12.7284 2.14259 12.6373 2.18044C12.5461 2.2183 12.4633 2.27377 12.3936 2.34369L2.33114 12.4062Z" fill="#0884FF" />
                          <path d="M14.3748 7.88117C14.2925 7.88165 14.211 7.86588 14.1348 7.83478C14.0587 7.80367 13.9894 7.75785 13.931 7.69992L10.0498 3.80617C9.9915 3.7479 9.94527 3.67872 9.91374 3.60258C9.8822 3.52644 9.86597 3.44483 9.86597 3.36242C9.86597 3.28001 9.8822 3.1984 9.91374 3.12226C9.94527 3.04613 9.9915 2.97694 10.0498 2.91867C10.108 2.8604 10.1772 2.81417 10.2534 2.78263C10.3295 2.7511 10.4111 2.73486 10.4935 2.73486C10.5759 2.73486 10.6575 2.7511 10.7337 2.78263C10.8098 2.81417 10.879 2.8604 10.9373 2.91867L14.831 6.81242C14.8896 6.87052 14.9361 6.93965 14.9678 7.01581C14.9996 7.09197 15.0159 7.17366 15.0159 7.25617C15.0159 7.33868 14.9996 7.42037 14.9678 7.49653C14.9361 7.57269 14.8896 7.64182 14.831 7.69992C14.7711 7.75936 14.6999 7.80607 14.6214 7.83722C14.543 7.86837 14.4591 7.88332 14.3748 7.88117Z" fill="#0884FF" />
                          <path d="M10.053 6.81464L5.18726 11.6804L6.07114 12.5643L10.9369 7.69852L10.053 6.81464Z" fill="#0884FF" />
                        </svg></span><span id={element._id} className="deleteHover" onClick={(e) => {
                          console.log(3,e)
                          setpopup(3)
                          setisChecked([element._id])
                          console.log(isChecked)
                          console.log('parithi', e.target.id)
                        }}><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 19.375H4C3.50272 19.375 3.02581 19.1775 2.67417 18.8258C2.32254 18.4742 2.125 17.9973 2.125 17.5V5.625C2.125 5.45924 2.19085 5.30027 2.30806 5.18306C2.42527 5.06585 2.58424 5 2.75 5C2.91576 5 3.07473 5.06585 3.19194 5.18306C3.30915 5.30027 3.375 5.45924 3.375 5.625V17.5C3.375 17.6658 3.44085 17.8247 3.55806 17.9419C3.67527 18.0592 3.83424 18.125 4 18.125H14C14.1658 18.125 14.3247 18.0592 14.4419 17.9419C14.5592 17.8247 14.625 17.6658 14.625 17.5V5.625C14.625 5.45924 14.6908 5.30027 14.8081 5.18306C14.9253 5.06585 15.0842 5 15.25 5C15.4158 5 15.5747 5.06585 15.6919 5.18306C15.8092 5.30027 15.875 5.45924 15.875 5.625V17.5C15.875 17.9973 15.6775 18.4742 15.3258 18.8258C14.9742 19.1775 14.4973 19.375 14 19.375Z" fill="#F81D1D" />
                            <path d="M16.5 4.375H1.5C1.33424 4.375 1.17527 4.30915 1.05806 4.19194C0.940848 4.07473 0.875 3.91576 0.875 3.75C0.875 3.58424 0.940848 3.42527 1.05806 3.30806C1.17527 3.19085 1.33424 3.125 1.5 3.125H16.5C16.6658 3.125 16.8247 3.19085 16.9419 3.30806C17.0592 3.42527 17.125 3.58424 17.125 3.75C17.125 3.91576 17.0592 4.07473 16.9419 4.19194C16.8247 4.30915 16.6658 4.375 16.5 4.375Z" fill="#F81D1D" />
                            <path d="M11.5 4.375C11.3342 4.375 11.1753 4.30915 11.0581 4.19194C10.9408 4.07473 10.875 3.91576 10.875 3.75V1.875H7.125V3.75C7.125 3.91576 7.05915 4.07473 6.94194 4.19194C6.82473 4.30915 6.66576 4.375 6.5 4.375C6.33424 4.375 6.17527 4.30915 6.05806 4.19194C5.94085 4.07473 5.875 3.91576 5.875 3.75V1.25C5.875 1.08424 5.94085 0.925268 6.05806 0.808058C6.17527 0.690848 6.33424 0.625 6.5 0.625H11.5C11.6658 0.625 11.8247 0.690848 11.9419 0.808058C12.0592 0.925268 12.125 1.08424 12.125 1.25V3.75C12.125 3.91576 12.0592 4.07473 11.9419 4.19194C11.8247 4.30915 11.6658 4.375 11.5 4.375Z" fill="#F81D1D" />
                            <path d="M9 16.25C8.83424 16.25 8.67527 16.1842 8.55806 16.0669C8.44085 15.9497 8.375 15.7908 8.375 15.625V6.875C8.375 6.70924 8.44085 6.55027 8.55806 6.43306C8.67527 6.31585 8.83424 6.25 9 6.25C9.16576 6.25 9.32473 6.31585 9.44194 6.43306C9.55915 6.55027 9.625 6.70924 9.625 6.875V15.625C9.625 15.7908 9.55915 15.9497 9.44194 16.0669C9.32473 16.1842 9.16576 16.25 9 16.25Z" fill="#F81D1D" />
                            <path d="M12.125 15C11.9592 15 11.8003 14.9342 11.6831 14.8169C11.5658 14.6997 11.5 14.5408 11.5 14.375V8.125C11.5 7.95924 11.5658 7.80027 11.6831 7.68306C11.8003 7.56585 11.9592 7.5 12.125 7.5C12.2908 7.5 12.4497 7.56585 12.5669 7.68306C12.6842 7.80027 12.75 7.95924 12.75 8.125V14.375C12.75 14.5408 12.6842 14.6997 12.5669 14.8169C12.4497 14.9342 12.2908 15 12.125 15Z" fill="#F81D1D" />
                            <path d="M5.875 15C5.70924 15 5.55027 14.9342 5.43306 14.8169C5.31585 14.6997 5.25 14.5408 5.25 14.375V8.125C5.25 7.95924 5.31585 7.80027 5.43306 7.68306C5.55027 7.56585 5.70924 7.5 5.875 7.5C6.04076 7.5 6.19973 7.56585 6.31694 7.68306C6.43415 7.80027 6.5 7.95924 6.5 8.125V14.375C6.5 14.5408 6.43415 14.6997 6.31694 14.8169C6.19973 14.9342 6.04076 15 5.875 15Z" fill="#F81D1D" />
                          </svg></span>
                      </td>
                    </tr>
                  );
                })
                }
            </tbody>

          </table>
          {/* <ReactTooltip type="info" effect="solid" id="tool" place="bottom" /> */}
          {/* <ReactTooltip type="info" effect="solid" event="click" id="tool" place="bottom"/> */}
        </div>
      </div>
    <ReactTooltip type="info" effect="solid"  id="tool" place="bottom"/>

      <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={getarr.length}
        
      />
      
    </store.Provider>
  );
}
export default Contacts;
