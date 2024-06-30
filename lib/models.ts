export type CreateContact = {
    name: string,
    phone: string
}

export type FormErrors = {
    name?: string[];
    phone?: string[];
};

export type Contact = {
    id: string;
    name: string;
    phone: string;
    createAt: Date;
    updateAt: Date;
};

export type FormState = CreateContact | FormErrors;
