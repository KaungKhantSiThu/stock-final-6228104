import dbConnect from "@/lib/dbConnect";
import Supplier from "@/models/Supplier";

export default async function handler(req, res) {
    await dbConnect()
    console.log("req.method: ", req.method)

    if (req.method === 'GET') {
        const docs = await Supplier.find().sort({name: 1})
        res.status(200).json(docs)
    } else if (req.method === 'POST') {
        const doc = await Supplier.create(req.body)
        res.status(201).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
