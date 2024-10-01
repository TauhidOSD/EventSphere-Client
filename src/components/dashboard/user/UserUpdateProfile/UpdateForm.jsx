"use client";
import React, { useState } from "react";

// Client Component (form handling part)
const UpdateFrom = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        specialty: "",
        skills: "",
        gender: "",
        birth: "",
        phone: "",
        email: "",
        country: "",
        city: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div>
            <h2 className="text-start text-xl font-semibold border-b py-5 mb-4 px-10">
                Account setup
            </h2>
            <form className="grid grid-cols-2 gap-4 px-4 md:px-10 pt-7" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                        placeholder="Name"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Surname</label>
                    <input
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                        placeholder="Surname"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Specialty</label>
                    <input
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                        placeholder="Specialty"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Skills</label>
                    <input
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                        placeholder="Skills"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                    >
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Birth</label>
                    <input
                        name="birth"
                        value={formData.birth}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                        placeholder="Birth (dd.mm.yyyy)"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Phone</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                        placeholder="Phone"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Email address</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                        placeholder="Email address"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">Country</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                    >
                        <option>Country</option>
                        <option>Russia</option>
                        <option>USA</option>
                        <option>India</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium">City</label>
                    <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border py-4 px-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-green-100"
                        placeholder="City"
                    />
                </div>
                <div className="col-span-2">
                    <button
                        type="submit"
                        className=" -mt-6 mb-6 bg-green-500 text-white py-2 px-4 rounded-lg max-w-52"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateFrom;