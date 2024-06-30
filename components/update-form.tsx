"use client"

import { updateContact } from "@/lib/actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "@/components/butttons";
import { Contact } from "@/lib/models";

const UpdateForm = ({ contact }: { contact: Contact }) => {
    const updateContactWithId = updateContact.bind(null, contact.id)
    const [state, formAction] = useFormState(updateContactWithId, null);

    return (
        <div>
            <form action={formAction}
            >
                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-900 mb-1"
                    >
                        Full Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={contact.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Full Name..."
                    />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
                    </div>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-900 mb-1"
                    >
                        Phone Number:
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        defaultValue={contact.phone}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Phone Number..."
                    />
                    <div id="phone-error" aria-live="polite" aria-atomic="true">
                        <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
                    </div>
                </div>
                <div id="phone-error" aria-live="polite" aria-atomic="true">
                    <p className="mt-2 text-sm text-red-500">{state?.message}</p>
                </div>
                <SubmitButton label="update" />
            </form>
        </div>
    )
}

export default UpdateForm