type Address = {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip: string;
};

type Name = {
  firstName: string;
  lastName: string;
};

class User {
  #_id: number;
  #_name: Name;
  public address: Address;
  public phone: string;
  #_email: string;
  #_password: string;
  #_createdAt: Date;
  #_isAdmin: boolean = false;
  #_isBusiness: boolean = false;

  constructor(
    name: Name,
    address: Address,
    email: string,
    phone: string,
    password: string
  ) {
    this.#_id = this.GenerateId();
    this.#_name = name;
    this.address = address;
    this.#_email = email;
    this.phone = phone;
    this.#_password = password;
    this.#_createdAt = new Date();
  }

  private GenerateId() {
    const MIN = 1_000_000;
    const MAX = 9_999_999;
    return Math.random() * (MAX - MIN) + MIN;
  }

  public set setName(name: Name) {
    this.#_name = name;
  }
  get id() {
    return this.#_id;
  }
  get name() {
    return this.#_id;
  }
  get address() {
    return this.#_id;
  }
  get id() {
    return this.#_id;
  }
  get id() {
    return this.#_id;
  }
  get id() {
    return this.#_id;
  }
  get id() {
    return this.#_id;
  }
}
