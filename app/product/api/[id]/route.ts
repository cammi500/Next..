import {query }from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request:Request,
    {params}: {params:{id:string} }
) {
    const id =params.id;
    const sql = `
    DELETE FROM Products WHERE id = ?
    `;
    try{
        const data = await query(sql,[id]);
        return NextResponse.json(data);
    }catch(error){
        return NextResponse.json(error);
    }
}


