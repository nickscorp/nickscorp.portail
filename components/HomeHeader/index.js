/**
 * Header
 * @param {object} children is your menu link items
 */
import useScrollingUp from './useScrollingUp'
import styles from './index.module.scss'
import Image from 'next/image'
import { Select } from 'antd';
import logo from '../../public/logo.png'
import frFlag from '../../public/fr-flag.png'
import usaFlag from '../../public/usa-flag.png'
import Logo from '../Logo';
 const { Option } = Select;
 
 const HomeHeader = ({ children }) => {
   const isScrollingUp = useScrollingUp()

   return (
        <header className={ styles.header }>
            <Logo/>
            <div className={styles.right}>
                <Select className={styles.select} defaultValue="fr" bordered={false}>
                    <Option className={styles.option} value="fr">
                        <Image width={15} height={10} src={frFlag} />  &nbsp; {` FR`}
                    </Option>
                    <Option className={styles.option} value="us">
                        <Image width={15} height={10} src={usaFlag} /> &nbsp; {` US`}
                    </Option>
                </Select>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                    viewBox="0 0 56 56"   >
                    <g>
                        <path d="M8,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,40,8,40z"/>
                        <path d="M28,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,40,28,40z"/>
                        <path d="M48,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S52.411,40,48,40z"/>
                        <path d="M8,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,20,8,20z"/>
                        <path d="M28,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,20,28,20z"/>
                        <path d="M48,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S52.411,20,48,20z"/>
                        <path d="M8,0C3.589,0,0,3.589,0,8s3.589,8,8,8s8-3.589,8-8S12.411,0,8,0z"/>
                        <path d="M28,0c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,0,28,0z"/>
                        <path d="M48,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S43.589,16,48,16z"/>
                    </g>
                </svg>


                <div className={styles.connexion}>Connexion</div>
            </div>
        </header>
    )
 }
 export default HomeHeader
 