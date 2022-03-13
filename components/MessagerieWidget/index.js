import React,{useState,useEffect} from 'react'
import styles from './index.module.scss'
import { User1Message,User2Message } from './message';
import { Input,Avatar,List, message, Skeleton, Divider  } from 'antd';
import { MessageFilled,MessageOutlined,SendOutlined,SwapLeftOutlined,AntDesignOutlined} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import {chatAPi} from '../../constants'
import io from "socket.io-client";
import axios from 'axios';
import ScrollableFeed from 'react-scrollable-feed'

const { TextArea } = Input;
let socket;

export default function MessagerieWidget() {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(false);

  const name = "nc";
  
  const [loading, setLoading] = useState(false);

  const getMessages = () =>{
    axios.get(`${chatAPi}/messages/${room.id}`)
    .then((res)=>{
      console.log([...res.data])
      setMessages([...res.data])
    })
  }

  const saveMessage = () =>{
    axios.post(`${chatAPi}/messages`,{
      user : name,
      name : name,
      room : room.id,
      text : message,
    }).then((res)=>{
      setMessage("");
    })
  }

  const loadRooms = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`${chatAPi}/users`)
    .then(res => res.json())
    .then(body => {
      setRooms([...body]);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`${chatAPi}/users`)
    .then(res => res.json())
    .then(body => {
      setRooms([...rooms, ...body]);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    socket = io(chatAPi);
    if(room){
      getMessages();
      socket.emit("join", { name, room:room.id }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
      
  }, [room]);

  useEffect(()=>{
    if(socket && room){
      socket.on("message", (message) => {
          setMessages((messages) => [...messages, message]);
      });
    }
  },[socket,room])

  const handleSubmit = (e) => {
      e.preventDefault();
      if (message) {
        socket.emit("sendMessage", { message });
        saveMessage();
      } else alert("empty input");
  };

  return (
    <div className={styles.messagerieWidget}>
      <div className={styles.rooms}>
        <Input className={styles.search} placeholder="Search" />
        <div
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
          }}
        >
          <InfiniteScroll
            dataLength={rooms.length}
            next={loadMoreData}
            hasMore={rooms.length < 1}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={rooms}
              renderItem={item => (
                <List.Item  key={item.id} onClick={(e)=>{setRoom(item)}}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture} />}
                    title={item.name}
                    description={item.id}
                    style={{cursor:'pointer'}}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
      <div className={styles.messagerie}>
        {room ?
          <>
            <div className={styles.top}>
              <div>
                  &nbsp;
                  <SwapLeftOutlined onClick={(e)=>{setRoom(false)}}/>
                  &nbsp;
                  <Avatar
                      size={{ xs: 20, sm: 24, md: 34, lg: 60, xl: 76, xxl: 100 }}
                      icon={<AntDesignOutlined />}
                  />
                  <div className={styles.name}>{room.name}</div>
              </div>
            </div>
            <div className={styles.content}>
              <ScrollableFeed>
                  {messages.map((val, i) => {
                      return (
                          <>
                          {val.user !== room.name?
                              <User1Message key={i}>{val.text}</User1Message>
                          :
                              <User2Message key={i}>{val.text}</User2Message>
                          }
                          </>
                      );
                  })}
              </ScrollableFeed>
            </div>
            <div className={styles.smsZone}>
                <TextArea  className={styles.input} value={message} placeholder="textarea with clear icon" onChange={(e)=>setMessage(e.target.value)} />
                <div className={styles.send} onClick={(e)=>{handleSubmit(e)}}>
                    <SendOutlined />
                </div>
            </div>
          </>
        :
          <div className={styles.noRoom}>
              <span>Aucune discussion choisie</span>
              <p>Veuillez choisir une discussion</p>
          </div>
        }
      </div>
    </div>
  )
}
