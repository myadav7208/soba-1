 
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"product"})


export class product{
    @PrimaryGeneratedColumn()
    productId:number

    @Column({name:"Date"})
    date:string

    @Column({name:"Details"})
     details:string

    @Column({name:"Rate"})
     rate:number
 
    @Column({name:"Code"})
     code:number

    @Column({name:"Size",nullable:true})
     size:number

    @Column({name:"RunNo"})
     runNo:number

    @Column({name:"Bill_No"})
     billNo:number 

    @Column({name:"Average",nullable:true})
     average:number

    @Column({name:"Embroidary",nullable:true})
     embroidary:string

    @Column({name:"Fitting_Stich",nullable:true})
     fittingStich:string

    @Column({name:'Button_Stich',nullable:true})
     buttonStich:string

    @Column({name:"Print",nullable:true})
     print:string

    @Column({name:"Printex",nullable:true})
     printex:string

    @Column({name:"K_Making",nullable:true})
     kMaking:string

    @Column({name:"Tag",nullable:true})
     tag:string

    @Column({name:"Label",nullable:true})
     label:string

    @Column({name:"Making",nullable:true})
     making:string

    @Column({name:"Canvas",nullable:true})
     canvas:string

    @Column({name:"Total_Amount",nullable:true})
     totalAmount:number

    @Column({name:"Product_Image",nullable:true})
    productImage:string
    
    @Column({name:"Company_Id",nullable:true})
    companyId:number

      

}