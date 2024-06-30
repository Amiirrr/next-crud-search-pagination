"use server";

import { z, ZodError, ZodType } from "zod"
import { prisma } from "@/lib/prisma"
import { CreateContact, FormErrors, FormState } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ContactSchema: ZodType = z.object({
    name: z.string().min(6).max(100),
    phone: z.string().min(11).max(15)
})

export const saveContact = async (prevState: any, FormData: FormData) => {
    try {
        const validatedFields: CreateContact = ContactSchema.parse(Object.fromEntries(FormData.entries()));
        await prisma.contact.create({
            data: {
                name: validatedFields.name,
                phone: validatedFields.phone
            }
        })
    } catch (error) {
        if (error instanceof ZodError) {
            const fieldErrors: FormErrors = error.flatten().fieldErrors;
            return { Error: fieldErrors };
        } else {
            return { message: "Failed to create contact" };
        }
    }
    revalidatePath("/contacts")
    redirect("/contacts")
}
export const updateContact = async (id: string, prevState: any, FormData: FormData) => {
    try {
        const validatedFields: CreateContact = ContactSchema.parse(Object.fromEntries(FormData.entries()));
        await prisma.contact.update({
            where: { id },
            data: {
                name: validatedFields.name,
                phone: validatedFields.phone
            }
        })
    } catch (error) {
        if (error instanceof ZodError) {
            const fieldErrors: FormErrors = error.flatten().fieldErrors;
            return { Error: fieldErrors };
        } else {
            return { message: "Failed to update contact" };
        }
    }
    revalidatePath("/contacts")
    redirect("/contacts")
}

export const deleteContact = async (id: string) => {
    try {
        await prisma.contact.delete({
            where: { id }
        })
    } catch (error) {
        return { message: "Failed to delete contact" };
    }
    revalidatePath("/contacts")
}