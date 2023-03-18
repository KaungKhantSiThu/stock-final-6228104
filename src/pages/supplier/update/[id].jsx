/*
Update page
It populates the blog data into the form.
*/
import Head from "next/head"
import Link from "next/link"

import { useState } from "react";
import { useForm } from "react-hook-form";



// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");


    const updateSupplier = async (data) => {
        const response = await fetch(`/api/supplier/${supplier._id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // serialisation
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        const result = await response.json();   // deserialise
        if (result.error) {
            alert("Error: " + result.error)
        } else {
            alert("Supplier updated")
            window.location.href = "/supplier"
        }
        console.log(result)
        setData(JSON.stringify(data))
    }

    console.log('Supplier 2', supplier)
    if (!supplier) return (
        <div>
            <p>Blog not found</p>
            <Link href="/supplier">Back</Link>
        </div>
    );

    return (
        <>
            <Head>
                <title>Update {supplier.name}</title>
            </Head>

            <div className="form-wrapper" style={{ margin: '1rem' }}>
                <form onSubmit={handleSubmit(updateSupplier)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label><br />
                        <input id="name" {...register("name", { required: true })} className="form-control" placeholder={supplier.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label><br />
                        <textarea id="address" {...register("address", { required: true })} className="form-control" placeholder={supplier.address} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label><br />
                        <input id="phoneNumber" type="tel" {...register("phoneNumber", { required: true })} className="form-control" placeholder={supplier.phoneNumber} />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link href="/supplier" className="no-text-decoration">Back</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
    console.debug('params', params)
    const res = await fetch(`https://stock-final-6228104.vercel.app/api/supplier/${params.id}`)
    const supplier = await res.json()
    console.debug('Supplier 1', supplier)
    return { props: { supplier } }
}