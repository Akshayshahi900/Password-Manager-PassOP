import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const showPassword = () => {
        if (ref.current.src.includes("/images/eyenot.svg")) {
            passwordref.current.type = "text";
            ref.current.src = "/images/eye.svg";
        } else {
            passwordref.current.type = "password";
            ref.current.src = "/images/eyenot.svg";
        }
    };

    const savePassword = (e) => {
        if((form.site.length>3 && form.username.length>3 && form.password.length>3)){
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
        setform({ site: "", username: "", password: "" });
        toast('Password Saved Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });}
        else{toast('Password Not saved!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });}
    };

    const deletePassword = (id) => {
        let c = confirm("Are you sure to delete this password?");
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
        setform(passwordArray.find(item => item.id === id));
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Text copied to Clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_2rem sm:size:4rem_3rem md:size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>

            <div className="container flex flex-col items-center justify-center my-10 w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto min-h-96">
                <div>
                    <span className='text-blue-400 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold'>Pass</span>
                    <span className='text-orange-400 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold'>Op</span>
                    <h1 className='text-center font-semibold my-1 text-lg sm:text-xl md:text-2xl lg:text-3xl'>Your Password Buddy</h1>
                </div>

                <div className='flex flex-col gap-6 mt-10 w-full max-w-md'>
                    <input value={form.site} onChange={handleChange} type="text" name='site' className='w-full py-2 px-3 border border-black rounded-full' placeholder='Enter the website name' />

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <input value={form.username} onChange={handleChange} type="text" name='username' className='w-full sm:w-1/2 py-2 px-3 border border-black rounded-full' placeholder='Enter User Name' />
                        <div className='flex w-full sm:w-1/2 relative'>
                            <input value={form.password} onChange={handleChange} type="password" ref={passwordref} name='password' className='w-full py-2 px-3 border border-black rounded-full' placeholder='Enter Password ' />
                            <span className='absolute top-2.5 right-4 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="/images/eye.svg" alt="" />
                            </span>
                        </div>
                    </div>
                </div>

                <button onClick={savePassword} className='border-2 border-black rounded-full bg-orange-300 w-24 sm:w-32 md:w-36 lg:w-40 text-blue-900 my-3 flex justify-center items-center'>
                    <lord-icon
                        src="https://cdn.lordicon.com/zrkkrrpl.json"
                        trigger="in"
                        delay="1500"
                        state="in-reveal"
                        colors="primary:#121331,secondary:#3080e8"
                    />
                    Save
                </button>
            </div>

            <h1 className='justify-center items-center flex font-extrabold text-xl sm:text-2xl md:text-3xl my-2 mb-8'>Your Passwords</h1>
            {passwordArray.length === 0 && <div className='text-center'>No Passwords to Show!!</div>}
            {passwordArray.length !== 0 && (
                <div className="overflow-x-auto w-full">
                    <table className="table-auto w-full max-w-5xl mx-auto border-2 border-black rounded-md bg-blue-50 mb-8">
                        <thead className='bg-blue-400'>
                            <tr>
                                <th className="px-4 py-2 text-center">Site</th>
                                <th className="px-4 py-2 text-center">Username</th>
                                <th className="px-4 py-2 text-center">Password</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => (
                                <tr key={index}>
                                    <td className='px-4 py-2 text-center'>
                                        <a target='_blank' href={item.site}> {item.site}</a>
                                        <span onClick={() => { copyText(item.site) }} className='ml-2 cursor-pointer'>
                                            <img src="/images/copy.svg" alt="" />
                                        </span>
                                    </td>
                                    <td className='px-4 py-2 text-center'>
                                        {item.username}
                                        <span onClick={() => { copyText(item.username) }} className='ml-2 cursor-pointer'>
                                            <img src="/images/copy.svg" alt="" />
                                        </span>
                                    </td>
                                    <td className='px-4 py-2 text-center'>
                                        {item.password}
                                        <span onClick={() => { copyText(item.password) }} className='ml-2 cursor-pointer'>
                                            <img src="/images/copy.svg" alt="" />
                                        </span>
                                    </td>
                                    <td className='px-4 py-2 text-center flex justify-center space-x-4'>
                                        <span onClick={() => { editPassword(item.id) }}>
                                            <img src="/images/edit.svg" alt="Edit" />
                                        </span>
                                        <span onClick={() => { deletePassword(item.id) }}>
                                            <img src="/images/delete.svg" alt="Delete" />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default Manager;
