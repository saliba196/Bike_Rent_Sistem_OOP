//Luiza Araujo de Oliveira Caram Saliba; RA:163931

import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { hash, compare } from 'bcrypt';
import { randomInt, randomUUID } from "crypto";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }

    async registerUser(user: User): Promise<string> {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }

        const newId = randomUUID()
        user.id = newId

        // Criptografando a senha do usuário
        user.password = await this.cryptoPassword(user.password);

        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const bikeRents = this.rents.filter(rent =>
            rent.bike.id === bikeId && !rent.dateReturned
        )
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string): void {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )
        if (rent) {
            rent.dateReturned = today
            return
        }
        throw new Error('Rent not found.')
    }

    // <<< Implementação do exercício 4 >>>

    searchUsersByName(name: string): User[] {
        return this.users.filter( user => user.name.includes(name));
    }

    searchRentsByBike(bike: Bike): Rent[] {
        return this.rents.filter( rent => rent.bike === bike);
    } 

    searchRentsByUser(user: User): Rent[] {
        return this.rents.filter( rent => rent.user === user);
    }

    searchReturnedRents(): Rent[] {
        return this.rents.filter( rent => rent.dateReturned !== undefined);
    }

    searchActiveRents(): Rent[] {
        return this.rents.filter( rent => rent.dateReturned === undefined);
    }

    searchBikeById(id: string): Bike | undefined {
        return this.bikes.find( bike => bike.id === id);
    }

    searchBikesByName(name: string): Bike[] {
        return this.bikes.filter( bike => bike.name.includes(name));
    }

    async cryptoPassword(password: string): Promise<string> {
        const randomSalt = randomInt(10, 16);
        return await hash(password, randomSalt)
    }

    async authenticateUser(userId: string | undefined, password: string): Promise<User> {
        const user = this.users.find( _user => _user.id === userId )

        if (user === undefined) {
            throw new Error('User not found!')
        }

        // Comparando a senha do front-end com a senha criptografada
        const isValidPassword = await compare(password, user.password)

        if (isValidPassword) {
            return user
        }

        throw new Error('Incorrect password!')
    }
}
