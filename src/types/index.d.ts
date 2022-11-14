declare module "@pet/animal" {
  export interface Breeds {
    primary: string;
    secondary?: any;
    mixed: boolean;
    unknown: boolean;
  }

  export interface Breed {
    name: string;
    _links: {
      type: {
        href: string;
      };
    };
  }

  export interface Colors {
    primary?: any;
    secondary?: any;
    tertiary?: any;
  }

  export interface Attributes {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed?: any;
    special_needs: boolean;
    shots_current: boolean;
  }

  export interface Environment {
    children: boolean;
    dogs: boolean;
    cats: boolean;
  }

  export interface Photo {
    small: string;
    medium: string;
    large: string;
    full: string;
  }

  export interface Video {
    embed: string;
  }

  export interface Address {
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  }

  export interface Contact {
    email: string;
    phone: string;
    address: Address;
  }

  export interface Self {
    href: string;
  }

  export interface Type {
    href: string;
  }

  export interface Organization {
    href: string;
  }

  export interface Links {
    self: Self;
    type: Type;
    organization: Organization;
  }

  export interface Animal {
    id: number;
    organization_id: string;
    url: string;
    type: string;
    species: string;
    breeds: Breeds;
    colors: Colors;
    age: string;
    gender: string;
    size: string;
    coat?: any;
    attributes: Attributes;
    environment: Environment;
    tags: string[];
    name: string;
    description: string;
    photos: Photo[];
    videos: Video[];
    status: string;
    published_at: Date;
    contact: Contact;
    _links: Links;
  }

  export interface Previous {
    href: string;
  }

  export interface Next {
    href: string;
  }

  export interface Pagination {
    count_per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
    _links: {
      previous: Previous;
      next: Next;
    };
  }

  export interface RootObject {
    animals: Animal[];
    pagination: Pagination;
  }

  export interface TypeAnimal {
    name: string;
    coats: string[];
    colors: string[];
    genders: string[];
    _links: {
      self: Self;
      breeds: Self;
    };
  }

  export interface QueryParams {
    type?: string;
    breed?: string;
    size?: string;
    gender?: string;
    age?: string;
    color?: string;
    coat?: string;
    status?: string;
    name?: string;
    organization?: string;
  }
}
