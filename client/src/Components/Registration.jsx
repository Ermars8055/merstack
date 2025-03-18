import axios from "axios";
import React, { useState } from "react";

function RegisterForm() {
const [name,setName] = useState()
const [email,setEmail] = useState()
const [phone, setPhone] = useState()
const [location,setLocation] = useState()
const [status,setStatus] = useState()
const handleSubmit = (e) => {
e.preventDefault()
axios.post('http://localhost:8000/register',
{name,email,phone,location})
.then(result=>setStatus(result.data))
.catch(err=>setStatus(err))
}
return (
<div>
<form onSubmit={handleSubmit}>
<h3>Registration Form</h3>
<div>
<label> Name </label>
<input onChange={(e)=>setName(e.target.value)}></input>
</div>
<div>
<label> Email </label>
<input onChange={(e)=>setEmail(e.target.value)}></input>
</div>
<div>
<label> Phone </label>
<input onChange={(e)=>setPhone(e.target.value)}></input>
</div>
<div>
<label> Location </label>
<input onChange={(e)=>setLocation(e.target.value)}></input>
</div>
<div>
<button type="submit"> Sign Up </button>
</div>
<div> {status} </div>
</form>
</div>
);
}
export default RegisterForm