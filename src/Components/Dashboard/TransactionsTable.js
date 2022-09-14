import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import { useNavigate } from 'react-router-dom'
import { SearchOutlined, EyeTwoTone,FileImageOutlined , DeleteTwoTone,EditTwoTone , ExclamationCircleOutlined, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Button, Input, Space, Table, Badge, Image,Form } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import axios from "axios";
import url from '../url'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@mui/material';
import { Modal } from 'antd';
import { SignalCellularNullOutlined } from '@material-ui/icons';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../tableStyle.css'
const { confirm } = Modal;

const iconFont = {
  fontSize: '20px'
}
// const data = [
//   {
//     key: '1',
//     transactionId: 23423,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />
//   },
//   {
//     key: '2',
//     transactionId: 23424,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '3',
//     transactionId: 23425,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '4',
//     transactionId: 23426,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Verified' style={{
//       backgroundColor: '#52c41a',
//     }} />

//   },
//   {
//     key: '5',
//     transactionId: 23424,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '6',
//     transactionId: 23425,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '7',
//     transactionId: 23426,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Verified' style={{
//       backgroundColor: '#52c41a',
//     }} />

//   },
//   {
//     key: '8',
//     transactionId: 23424,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '9',
//     transactionId: 23425,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '10',
//     transactionId: 23426,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Verified' style={{
//       backgroundColor: '#52c41a',
//     }} />

//   },
//   {
//     key: '11',
//     transactionId: 23426,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Verified' style={{
//       backgroundColor: '#52c41a',
//     }} />

//   },
//   {
//     key: '12',
//     transactionId: 23424,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '13',
//     transactionId: 23425,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '14',
//     transactionId: 23426,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Verified' style={{
//       backgroundColor: '#52c41a',
//     }} />

//   },
//   {
//     key: '15',
//     transactionId: 23424,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '16',
//     transactionId: 23425,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Unverified' />

//   },
//   {
//     key: '17',
//     transactionId: 23426,
//     phoneNumber: '031111111111',
//     Name: 'User',
//     email:'email@gmail.com',
//     status:<Badge count='Verified' style={{
//       backgroundColor: '#52c41a',
//     }} />

//   },
// ];

const marginTop = {
  marginTop: '40px'
}

function TransactionsTable() {
  let navigate = useNavigate();

  // Get all 
  const [data, setData] = useState([]);


  const [loading, setLoading] = useState(false);
  const getAllData = () => {
    axios.get(`${url}user/get-all-transaction`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setData(response.data);
        setLoading(true)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  useEffect(() => {
    getAllData();

  }, []);
  const checkbox1 = (Did) => {
    console.log(Did);

    axios.put(`${url}user/block-user`, {
      _id: Did
    }, { headers }).then(response => {
      console.log(response);
      console.log('User Blocked')
      getAllData();
      Modal.success({
        content: 'User Blocked Successfully',
      });
    })
      .catch(err => {
        console.log(err)
      })
  }
  const headers = {
    'Content-Type': 'application/json'
  }
  const checkbox = (Did) => {
    console.log(Did);

    axios.put(`${url}user/change-status-transaction`, {
      _id: Did,
      // status:
    }, { headers }).then(response => {
      console.log(response);
      console.log('Status Changed')
      getAllData();
      Modal.success({
        content: 'Status Changed Successfully',
      });
    })
      .catch(err => {
        console.log(err)
      })
  }

  function handleClick(event) {
    event.preventDefault();
    // navigate('/drawer');
    window.location.reload();

    console.info('You clicked a breadcrumb.');
  }
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const [status, setStatus] = useState();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const columns = [

    {
      title: 'TransactionId',
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: '20%',
      ...getColumnSearchProps('transactionId'),
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
      width: '20%',

      ...getColumnSearchProps('userName'),
      sorter: (a, b) => a.userName.length - b.userName.length,
      sortDirections: ['descend', 'ascend'],
    },

    {
      title: 'Recipient Name',
      dataIndex: 'recipientName',
      key: 'recipientName',
      width: '20%',
      ...getColumnSearchProps('recipientName'),
      sorter: (a, b) => a.recipientName.length - b.recipientName.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      render: (_, record) => (
        <Space size="middle">
          {/* Verify User */}
          {record.status=='completed' ? <Badge count='completed' style={{
            backgroundColor: '#52c41a',
          }} />
            :null
            //  <Badge count='pending' style={{
            //   backgroundColor: 'red',
            // }} />
            }
            {record.status=='pending' ? <Badge count='pending' style={{
            backgroundColor: 'red',
          }} />
            :null
            //  <Badge count='pending' style={{
            //   backgroundColor: 'red',
            // }} />
            }
            {record.status=='rollback' ? <Badge count='rollback' style={{
            backgroundColor: 'blue',
          }} />
            :null
            //  <Badge count='pending' style={{
            //   backgroundColor: 'red',
            // }} />
            }
             {record.status=='failed' ? <Badge count='failed' style={{
            backgroundColor: 'pink',
          }} />
            :null
            //  <Badge count='pending' style={{
            //   backgroundColor: 'red',
            // }} />
            }
        </Space>
      ),
    },
    {
      title: 'Action',
      width: '20%',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
         
            <a
              onClick={() => {
                // checkbox(record._id)
              }}
            >
              <EditTwoTone style={iconFont} twoToneColor="green" onClick={() => {showModalStatus(record._id)}}/></a>
              <Modal
        title="Change Status"
        visible={visibleStatus}
        onOk={handleOkStatus}
        confirmLoading={confirmLoadingStatus}
        onCancel={handleCancelStatus}
      >
         <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value='completed'>Completed</MenuItem>
          <MenuItem value='pending'>Pending</MenuItem>
          <MenuItem value='rollback'>Rollback</MenuItem>
          <MenuItem value='failed'>Failed</MenuItem>

        </Select>
      </FormControl>
        
        
       
      </Form>
      </Modal>
          
           <a
            onClick={() => {
              // console.log(row._id)
              onToggleView(record._id)
            }}
          >< EyeTwoTone style={iconFont} twoToneColor="orange" /></a>
          <a
            onClick={() => {
              // console.log(row._id)
              deleteData(record._id)
            }}
          ><DeleteTwoTone style={iconFont} twoToneColor="red" /></a>

        </Space>

      ),
      //   ...getColumnSearchProps('age'),
    },
  ];
  //   View 
  const [visibleView, setVisibleView] = useState(false);
  const [confirmLoadingView, setConfirmLoadingView] = useState(false);
  const [modalTextView, setModalTextView] = useState('Content of the modal');

  const showModalView = () => {
    setVisibleView(true);
  };

  const handleOkView = () => {
    setModalTextView('The modal will be closed after two seconds');
    setConfirmLoadingView(true);
    setTimeout(() => {
      setVisibleView(false);
      setConfirmLoadingView(false);
    }, 2000);
  };

  const handleCancelView = () => {
    console.log('Clicked cancel button');
    setVisibleView(false);
  };
  const [idData, setIdData] = useState();
  const [Img, setImg] = useState();

  const [transactionId, settransactionId] = useState();
  const [User, setUser] = useState();
  const [Receiver, setReceiver] = useState();
  const [amount, setAmount] = useState();

  const onToggleView = async (id) => {
    // setOpenUpdate(true);


    console.log(id);

    await axios.get(`${url}user/get-transaction`, {
      params: {
        _id: id
      }
    }, { headers }).then(response => {
      console.log('response')
      console.log(response.data);
      setIdData(response.data._id);
      // setImg(response.data.image);

      settransactionId(response.data.transactionId);
      setUser(response.data.userName);
      setReceiver(response.data.recipientName);
      setAmount(response.data.amount);


      // setStartTime(response.data.startTime);
      // setEndTime(response.data.endTime);
      // setLocation(response.data.location);
      // setDoctorFee(response.data.doctorFee)
      // setSubscriptionType(response.data.price)
      // setImgData(response.data.image)
      // setDetail(response.data.detail)
      // setValueRate(response.data.totalRating)
      setVisibleView(true);

    })
      .catch(err => {
        console.log(err)
      })
  }
 
  // Delete 
  const showDeleteConfirm = (idData) => {
    confirm({
      title: 'Are you sure delete this Transaction?',
      icon: <ExclamationCircleOutlined />,
      //   content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',

      onOk() {
        console.log('OK');
        axios.delete(`${url}user/delete-transaction`, {
          data: {
            _id: idData
          }
        }, { headers })
          .then(res => {
            console.log(res);
            getAllData()
          }).catch(err => {
            console.log(err)
          })
      },

      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const deleteData = (idData) => {
    console.log(idData)
    showDeleteConfirm(idData)

  }
  // dialog status
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [DidStatus, setDidStatus] = useState();

  const [confirmLoadingStatus, setConfirmLoadingStatus] = useState(false);
  const [modalTextStatus, setModalTextStatus] = useState('Content of the modal') 
  const showModalStatus = (Did) => {
    console.log(Did)
    setDidStatus(Did)

    setVisibleStatus(true);
  };

  const handleOkStatus = () => {
    // Change status Api 
   
    setModalTextStatus('The modal will be closed after two seconds');
    setConfirmLoadingStatus(true);
    setTimeout(() => {
      axios.put(`${url}user/change-status-transaction`, {
        _id: DidStatus,
        status:status
      }, { headers }).then(response => {
        console.log(response);
        console.log('Status Changed')
        getAllData();
      setVisibleStatus(false);

        Modal.success({
          content: 'Status Changed Successfully',
        });
      })
        .catch(err => {
          console.log(err)
        })
      setConfirmLoadingStatus(false);
    }, 2000);
  };

  const handleCancelStatus = () => {
    console.log('Clicked cancel button');
    setVisibleStatus(false);
  };

  return (
    <div>
      <div style={marginTop}>
        <h2 className='headingStyle1'>Transactions</h2>
        <div className='tableResponsive'>
        <Table columns={columns} dataSource={data} />

        </div>
        <Modal
          title="Transaction Details"
          visible={visibleView}
          onOk={handleOkView}
          confirmLoading={confirmLoadingView}
          onCancel={handleCancelView}
        >
          <Grid container spacing={2}>
           
            <Grid item xs={6}>
              <Typography >TransactionId :</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography >{transactionId}</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography >Sender Name :</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography >{User}</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography >Recipient Name :</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography >{Receiver}</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography >Amount :</Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography >{amount}</Typography>

            </Grid>
            
          </Grid>
        </Modal>
        

      </div>
    </div>
  )
}

export default TransactionsTable
