import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


 @Entity({name:"productallotment"})
export class productAllotment{
   
     @PrimaryGeneratedColumn()
     productAllotementId
     @Column({name:"Date"})
      date:string
     @Column({name:"Date"})
      vendorId:string
     @Column({name:"Size"})
      size:string
     @Column({name:"ProductQuantity"})
      productQuantity:string
     @Column({name:"VendorRate"})
      vendorRate:number
     @Column({name:"DeliveryDate"})
      deliveryDate:string
     @Column({name:"Amount"})
      totalAmount:number
     @Column({name:"AdvancePayment"})
       advancePayment:number
     @Column({name:"balanceAmmount"})
      balanceAmount:string
     @Column({name:"Description"})
      description:string

      @Column({name:"productImage"})
       productImage:string
       @Column({name:"companyId"})
         companyId:number
        
         
     
}