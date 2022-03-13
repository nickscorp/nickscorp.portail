import React ,{Fragment,useEffect,useState} from 'react'
import styles from './index.module.scss'
import Image from 'next/image'
import { Avatar } from 'antd';
import { MessageFilled,MessageOutlined,SendOutlined,SwapLeftOutlined,AntDesignOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import { User1Message,User2Message } from './message';
import {chatAPi} from '../../constants'
import io from "socket.io-client";
import axios from 'axios';
import ScrollableFeed from 'react-scrollable-feed'
import Logo from '../Logo';
import { useCookies } from 'react-cookie';

const { TextArea } = Input;

let socket;
export default function MessagePopup() {

    const [opened,setOpened] =  useState(false)
    const [chat,setChat] =  useState(false)
    const [email,setEmail] = useState(false)
    const [name,setName] = useState(false)
    const [user,setUser] = useState(false)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    // const user = {
    //     id:"4c7b88ba-d7be-4a33-97a8-16489a7a2b98",
    //     name:"prince",
    //     email : "prince@ballo.fr"
    // }

    const getMessages = () =>{
        axios.get(`${chatAPi}/messages/${user.id}`)
        .then((res)=>{    
          setMessages([...res.data])
        })
    }

    const saveMessage = () =>{
        axios.post(`${chatAPi}/messages`,{
          user : user.name,
          name : user.name,
          room : user.id,
          text : message,
        }).then((res)=>{
          setMessage("");
        })
    }

    const handleSetUser = () =>{
        if(email && name){

            axios.post(`${chatAPi}/users`,{
                email:email,
                name : name
            }).then((res)=>{
                console.log(res.data)
                setUser(res.data)
                setCookie('ncChatUser', res.data, { path: '/' });
            })
        }
    }

    useEffect(()=>{
        console.log(cookies)
        if(cookies.ncChatUser){
            setChat(true)
            setUser(cookies.ncChatUser)
        }
    },[])

    useEffect(() => {
        if(user && !socket){
            getMessages()
            socket = io(chatAPi); 
            socket.emit("join", {name:user.name,room:user.id}, (error) => {
                console.log(true)
              if (error) {
                alert(error);
              }
            });
        }
    }, [chat,user]);

    useEffect(()=>{
        if(socket){
            socket.on("message", (message) => {
                setMessages((messages) => [...messages, message]);
            });
        }
    },[socket])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message) {
          socket.emit("sendMessage", { message });
          saveMessage();
        } else alert("empty input");
    };

    return (
        <div className={styles.popup}>
            {opened&&
            <>
                {(chat && user.id) ?
                    <div className={styles.messagerie}>
                        <div className={styles.top}>
                            <div>
                                &nbsp;
                                <SwapLeftOutlined onClick={(e)=>{setChat(false);setOpened(false)}} />
                                &nbsp;
                                <Avatar
                                    size={{ xs: 20, sm: 24, md: 34, lg: 60, xl: 76, xxl: 100 }}
                                    icon={<AntDesignOutlined />}
                                />
                                <div className={styles.name}>Nick's Corp</div>
                            </div>

                        </div>
                        <div className={styles.content}>
                            <ScrollableFeed>
                                {messages.map((val, i) => {
                                    return (
                                        <>
                                        {val.user !== user.name?
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
                            <TextArea autoFocus  className={styles.input} value={message} placeholder="textarea with clear icon" onChange={(e)=>setMessage(e.target.value)} />
                            <div className={styles.send} onClick={(e)=>{handleSubmit(e)}}>
                                <SendOutlined />
                            </div>
                        </div>
                    </div>
                :
                    <div className={styles.messagerie}>
                        <div className={styles.startChat}>
                            <div className={styles.bg}>
                                <Logo/>
                            </div>
                            <div className={styles.setMail}>
                                <Input className={styles.name} placeholder={"Name"} onChange={(e)=>setName(e.target.value)}/>
                                <Input placeholder={"Entrez votre email"} onChange={(e)=>setEmail(e.target.value)}/>
                                <div className={styles.startChatBtn} onClick={(e)=>{setChat(true);handleSetUser()}}>
                                    <SendOutlined />&nbsp;&nbsp;Send Message
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
            }
            <div className={styles.widget} onClick={(e)=>{setOpened(!opened)}} >{!opened ? <MessageFilled /> : <MessageOutlined/>}</div>
        </div>
    )
}
