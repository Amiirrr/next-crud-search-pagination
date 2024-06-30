import { getContacts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton } from "@/components/butttons";


const ContactTable = async ({
    query,
    currentPage
}: {
    query: string,
    currentPage: number
}) => {
    const contacts = await getContacts(query, currentPage);
    return (
        <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="py-3 px-6">No</th>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Phone Number</th>
                    <th className="py-3 px-6">Created At</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={contact.id} className="bg-white border-b">
                        <td className="py-3 px-6 font-normal"> {index + 1}</td>
                        <td className="py-3 px-6 font-normal">{contact.name}</td>
                        <td className="py-3 px-6 font-normal">{contact.phone}</td>
                        <td className="py-3 px-6 font-normal">{formatDate(contact.createAt.toString())}</td>
                        <td className="flex justify-center gap-1 py-3">
                            <EditButton id={contact.id} />
                            <DeleteButton id={contact.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ContactTable;