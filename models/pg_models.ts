import {Client} from 'https://deno.land/x/postgres/mod.ts';
import {QueryResult,QueryConfig} from 'https://deno.land/x/postgres/query.ts';

const client = new Client 
(
    {
     hostname:"localhost",
     port:5434,
     user:"postgres",
     password:"database",
     database:"db_blog"
    }
);
export async function select(qry : QueryConfig | QueryConfig[]){
    await client.connect();
    let tables : any =[]
    let hasil : QueryResult | QueryResult[];
    if (Array.isArray(qry)){
        hasil = await client.multiQuery(qry);
        hasil.forEach((obj)=>{
            tables.push(obj.rowsOfObjects());
    });}
    else{
        hasil=await client.query(qry);
        tables=hasil.rowsOfObjects()}
    await client.end();
    return tables;
}
export async function Insert(qry : QueryConfig):Promise<any[]>{        
    let Table : any = [];
    try{
        await client.connect();
        let hasil : QueryResult = await client.query(qry);
        await client.end();
        Table[0]='Sukses';
        Table[1]='Jumlah baris '+hasil.rowCount;
    } catch (error){
        Table[0] = 'Gagal';
        Table[1]=`${error}`;
    }
    return Table;
}