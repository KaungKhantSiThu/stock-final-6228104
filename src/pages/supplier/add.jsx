import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function AddSupplierPage() {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const saveSupplier = async (data) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/supplier`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            //redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        const result = await response.json();
        if (result.error) {
            alert("Error: " + result.error)
        } else {
            alert("Supplier added")
            window.location.href = "/supplier"
        }
        console.log(result)
        setData(JSON.stringify(data))
    }

    return (
        <>
            <div className="form-wrapper" style={{ margin: '1rem' }}>
                <form onSubmit={handleSubmit(saveSupplier)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label><br />
                        <input id="name" {...register("name", { required: true })} className="form-control" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label><br />
                        <textarea id="address" {...register("address", { required: true })} className="form-control" placeholder="Address" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label><br />
                        <input id="phoneNumber" type="tel" {...register("phoneNumber", { required: true })} className="form-control" placeholder="Phone Number" />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link href="/supplier" className="no-text-decoration">Back</Link>
                    </div>
                </form>
            </div>
        </>
    );
}