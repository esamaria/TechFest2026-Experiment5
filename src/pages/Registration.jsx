import { useState } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="page">
        <h1>Thank you, {name}!</h1>
        <p>You have been registered successfully.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Registration</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error-msg">{errors.name}</p>}

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}

        <label>Mobile Number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className="error-msg">{errors.phone}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Registration;