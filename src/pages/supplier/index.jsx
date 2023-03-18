import Head from 'next/head'
import Link from 'next/link'
export default function Home({ suppliers }) {

    function deleteBlog(id) {
        fetch(`/api/supplier/${id}`,
            {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                // alert("Deleting " + id)
                window.location.reload(false);
            })

    }

    return (
        <>
            <Head>
                <title>Suppliers</title>
            </Head>
            <div className="add-button">
                <Link className="bn3637 bn37" href="/supplier/add">New Supplier</Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
            {
                suppliers.map(supplier => {
                    return (
                        <tr key={supplier._id}>
                            <td>
                                <Link href={`/supplier/${supplier._id}`} className="no-text-decoration">
                                    {supplier.name}
                                </Link>
                            </td>
                            <td>
                                {supplier.phoneNumber}
                            </td>
                            <td>
                                <Link className="no-text-decoration" href={`/supplier/update/${supplier._id}`}>Update</Link>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => deleteBlog(supplier._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>
            <p>
            </p>

        </>
    )
}
export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/supplier/`)
    const suppliers = await res.json()
    console.log(suppliers)
    return { props: { suppliers } }
}