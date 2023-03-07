"use client";
import { useState } from "react";

const AUTH_URL = "https://bsky.social/xrpc/com.atproto.session.create";
const UPDATE_URL = "https://bsky.social/xrpc/com.atproto.handle.update";

export default function Form() {
    const [authForm, setAuthForm] = useState({
        "identifier": "",
        "password": ""
    });
    const [dnsForm, setDNSForm] = useState({
        "handle": ""
    });
    const [accessToken, setAccessToken] = useState("");
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);
    const [did, setDid] = useState("");
    const onAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setAuthForm({
            ...authForm,
            [event.target?.name] : event.target.value
        })
    }
    const onDNSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDNSForm({
            ...dnsForm,
            [event.target.name] : event.target.value
        })
    }
    const authenticate = (formData: AuthForm) => {
        setError(undefined);
        fetch(
            AUTH_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(formData)
            }
        ).then(response=> {
            return response.json()
        }).then(data=>{
            console.log(data);
            if(data["error"]) {
                setError(data["message"])
            }
            else {
                setAccessToken(data["accessJwt"]);
                setDid(data["did"]);
            }
        })
    }
    const setHandle = (formData: DNSForm) => {
        setError(undefined);
        fetch(UPDATE_URL, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(formData)
        }).then(response=> {
            if (response.ok) {
                setSuccess(true);
                return 
            }
            return response.json()
        }).then(data=>{
            if(data["error"]) {
                setError(data["message"]) 
            }
        })
    }
    if(!accessToken){
        return (
            <form onSubmit={(event)=>{
                event.preventDefault();
                authenticate(authForm);
            }} className="my-6">
                        <div className="mb-3">
                            <label htmlFor="identifier" className="form-label">Username</label>
                            <input type="text" className="form-control" id="identifier" name="identifier" onChange={onAuthChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={onAuthChange}/>
                        </div>
                        {
                        error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                            
                        }
                        <button type="submit" className="btn btn-primary">Authenticate</button>
                </form>
            
        )
    }
    if(accessToken && did) {
        return (
                <form onSubmit={(event)=>{
                    event.preventDefault();
                    setHandle(dnsForm);
                }} className="my-6">
                <div className="mb-3">
                    <label htmlFor="handle" className="form-label">Enter your domain</label>
                    <input type="text" className="form-control" id="handle" name="handle" onChange={onDNSChange}/>
                    
                </div>
                <div className="mb-3">
                <label htmlFor="textarea" className="form-label">Add the following record to your domain</label>
                    <pre className="form-control" id="textarea">
                        <b>Domain: </b> _atproto.{dnsForm.handle}
                        <br/>
                        <b>Type: </b> TXT
                        <br/>
                        <b>Value:</b> did={did}
                    </pre>
                </div>
                {
                            error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                }
                {
                            success &&
                            <div className="alert alert-success" role="alert">
                                Successfully set handle
                            </div>
                }
                <button type="submit" className="btn btn-primary">Set Handle</button>
                </form>
        )
    }

    return <div></div>
}