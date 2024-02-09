import {query} from "@/app/db";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req:any){
    const sql ="SELECT * FROM Products ORDER BY Id DESC";
    const result =await query(sql,"");

    try{
        return NextResponse.json(result);
}catch(err){
    return NextResponse.json(err);
}

}

//   product->add->page lar Post method
export async function POST(req:NextRequest) {
    const data =await req.formData();

    const sql = `
    INSERT INTO Products(Name,BuyPrice,SellPrice) values (?,?,?)
    `;

    const values =[
        data.get("name" || ""),
        data.get("buyPrice" ||""),
        data.get("sellPrice" || ""),
    ];
    
    try{
        //execute the sql
        await query(sql, values);
        
        return NextResponse.json({
            status :"success",
            message:"Successfully creating"
        });
    }catch(err){
        console.error("error:",err);
        NextResponse.json({
            status :"error",
            message:"Error creating",
            err,
        });
    }
}