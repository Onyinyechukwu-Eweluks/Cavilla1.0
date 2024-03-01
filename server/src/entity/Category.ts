import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Business } from "./Business";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
    
    @OneToMany(type => Business, business => business.category, { nullable: false, eager: true, onUpdate: "CASCADE", onDelete: "CASCADE" } )
    business!: Business[]
}
