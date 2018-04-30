export class User {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    constructor(name: string, email?: string, phone?: string, address?: string, password?: string) {
        this.name = name;
        this.email = (email ?  email : "");
        this.phone = (phone ?  phone : "");
        this.address = (address ?  address : "");
        this.password = (password ?  password : "");
    }
}