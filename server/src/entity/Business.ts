import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Employees } from './Employees';
import { Category } from './Category';

@Entity()
export class Business {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    businessName!: string

    @Column()
    ownerName!: string

    @Column()
    address!: string
    
    @Column()
    city!: string
    
    @Column()
    country!: string
    
    @Column()
    mobileNumber!: number
    
    @Column()
    officeNumber!: number
    
    @Column()
    email!: string
    
    @ManyToOne(type => Category, (category) => category.business, { nullable: false, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    category!: Category
    
    @Column()
    lisence!: string
    
    @Column()
    description!: string
    
    @Column()
    password!: string
    
    @OneToMany(type => Employees, (employee) => employee.businessName )
    employees!: Employees[]

}