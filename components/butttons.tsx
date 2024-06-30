"use client"
import Link from "next/link"
import { IoAddSharp, IoPencil, IoTrashBinOutline } from "react-icons/io5"
import { useFormStatus } from "react-dom"
import clsx from "clsx"
import { deleteContact } from "@/lib/actions"

type ButtonName = {
    name?: string
}
export const CreateButton = ({ name }: ButtonName) => {
    return (
        <Link
            href="/contacts/create"
            className="inline-flex gap-1 items-center px-5 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-900"
        >
            <IoAddSharp size={20} />
            {name}
        </Link>
    )
}
export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link
            href={`/contacts/edit/${id}`}
            className="rounded-sm boorder p-1 hover:bg-gray-100"
        >
            <IoPencil size={20} />
        </Link>
    )
}
export const DeleteButton = ({ id }: { id: string }) => {
    const handleDelete = async () => {
        await deleteContact(id);
    };

    return (
        <button
            className="rounded-sm boorder p-1 hover:bg-gray-100"
            onClick={handleDelete}
        >
            <IoTrashBinOutline size={20} />
        </button>
    )
}

export const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();

    const className = clsx(
        "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
        {
            "opacity-50 cursor-progress": pending,
        }
    );

    return (
        <button type="submit" className={className} disabled={pending}>
            {label === "save" ? (
                <span>{pending ? "Saving..." : "Save"}</span>
            ) : (
                <span>{pending ? "Updating..." : "Update"}</span>
            )}
        </button>
    );
};

