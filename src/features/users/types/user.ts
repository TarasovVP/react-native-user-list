export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  age: number;
  birthDate: string;
  gender: string;
}

export const userUtils = {
  getFullName: (user: User): string => `${user.firstName} ${user.lastName}`,
  
  formatBirthDate: (user: User): string => 
    `Born: ${user.birthDate} (${user.age} years old)`,
  
  fromApi: (apiData: any): User => ({
    id: apiData.id,
    firstName: apiData.firstName,
    lastName: apiData.lastName,
    email: apiData.email,
    phone: apiData.phone,
    image: apiData.image,
    age: apiData.age,
    birthDate: apiData.birthDate,
    gender: apiData.gender,
  }),
  
  copy: (user: User, updates: Partial<User>): User => ({
    ...user,
    ...updates,
  }),
};