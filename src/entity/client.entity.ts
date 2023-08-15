import {

  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';


@Entity({ name: 'client' })
export class Client extends BaseEntity {

  @PrimaryGeneratedColumn()
  clientId:number

  @Column({ name: "company" })
  companyName: string;

  @Column({ name: "gst" })
  gst: string;

  @Column({ nullable: true, name: "address" })
  address: string;

  @Column({ nullable: true, name: "email" })
  email: string;

  @Column({ name: "pinCode" })
  pinCode: string;

  @Column({ name: "state" })
  state: string;

  @Column({ name: "city" })
  city: string;

  @Column({name:"companyId"})
    companyId:number
 
    @ManyToOne (() => Company, company => company)
    company:Company;
}
