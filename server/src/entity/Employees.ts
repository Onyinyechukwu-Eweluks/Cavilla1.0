import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Business } from './Business'

@Entity()
export class Employees {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    dateOfBirth!: string
    
    @Column()
    address!: string
    
    @Column()
    iDNumber!: string
    
    @ManyToOne(() => Business, (business) => business.employees )
    businessName!: Business
}
