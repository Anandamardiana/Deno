import { renderFileToString } from 'https://deno.land/x/dejs/mod.ts';
import {Insert,select} from '../models/pg_models.ts';
import TSql from '../models/sql.ts';

const home = async ({response} :{response:any} ) => 
{
    const datatabel = await select([
        {text : TSql['KtgFindAll']},
        {text : TSql['BlogInfoFindAll']}
    ])
    const html = await renderFileToString("./views/home.ejs", {
    data:{
        pemrograman : datatabel[0],
        bloginfo :datatabel[1]
    },
        subview:
    {
        namafile: "./views/blogmain.ejs",
            showjumbotron:true
        }
    });
    response.body=new TextEncoder().encode(html);
}
const signup =async ({response,request,state}:{request:any,state:any,response:any})=>{
    if(!request.hasBody){
        let signupError :string ='';
        if((state.pesanError != undefined) && (state.pesanError != ' ')){
            signupError = state.pesanError;}
    const html =await renderFileToString("./views/home.ejs",{
        data:
        {
            pemrograman : await select(
                {
                    text : TSql ['KtgFindByKode'],
                    args : ['node']
                }
            ),
            statusSignup:signupError,
            bloginfo : await select(
                {
                    text : TSql['BlogInfoFindAll']
                }
            )
        },
        subview:
        {
            namafile: "./views/signup.ejs",
            showjumbotron:false
        }
    })
    response.body=new TextEncoder().encode(html);

    }else{
        const body =await request.body().value;
        const parseData = new URLSearchParams(body);
        const namalengkap= parseData.get("fullname");
        const namauser= parseData.get("username");
        const pwd= parseData.get("paswd");

        let hasil = await Insert({
            text:TSql['InsUser'],
            args : [namauser,namalengkap,pwd]
        });

        if(hasil[0]== 'Sukses'){
            state.pesanError = '';
            response.body = "Sukses menyimpan data ke database";
        }else{
            state.pesanError = hasil[1];
            response.redirect('/daftar');
        }
    }
    }
const kategori = async({params,response}:{params:{id:string},response:any})=>{
    response.body="ID Parameter : " + params.id;
}
export { home, signup,kategori}