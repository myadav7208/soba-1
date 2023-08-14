import {

  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'client' })
export class Client extends BaseEntity {

  @PrimaryGeneratedColumn()
  clientId;

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
}
