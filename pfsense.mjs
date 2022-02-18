import axios from 'axios'
import https from 'https';
import dotenv from 'dotenv'
import { Console } from 'console';
dotenv.config()
const url = process.env.PFSENSE_HOST
const user = process.env.PFSENSE_USER
const password = process.env.PFSENSE_PASSWORD






const execute = async (metodo, url, payload) =>{
    const api = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });
    
    let request;
    var config = {
        data : payload,
        headers: { 
            'Content-Type': ' application/json'
        }
    };

    switch (metodo) {
        case "POST":
            request = await api.post(url,payload)
          break;
        case "GET":
            request = await api.get(url,config)
          break;
        case "DELETE":
            request = await api.delete(url,config)
            break;
        default:
          console.log("I don't know this method");
          break;
      }

    return request
    

}

export const EnableRDP = async ()=>{

    const nat_url = `${url}api/v1/firewall/nat/port_forward`
    const payload ={
        "client-id": user,
        "client-token": password,
        "interface": "wan",
        "protocol": "tcp",
        "src": "any",
        "srcport": "any",
        "dst": "wanip",
        "dstport": "3389",
        "target": "192.168.24.105",
        "local-port": "3389",
        "natreflection": "purenat",
        "descr": "RDP TEMPORAL",
        "apply": true,
        "nosync": true,
        "top": false,
        "apply": true
    }
    const request = await execute('POST', nat_url, payload)
    return request
}

export const GetRDPId = async ()=>{
    const nat_url = `${url}api/v1/firewall/nat/port_forward`
    const payload = {
    "client-id": user,
    "client-token": password,
    "local-port": "3389"
        
    }
    const request = await execute('GET', nat_url, payload)
    return request
}

export const DisableRDP = async (id)=>{
    const payload={
        "client-id": user,
        "client-token": password,
        "id": id,
        "apply": true
    }
    const nat_url = `${url}api/v1/firewall/nat/port_forward`
    const request = await execute('DELETE', nat_url, payload)
    return request
}